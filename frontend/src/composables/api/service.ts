import type { CreateServiceWithId, EditService, OfferedService, Service } from "@/types/service";
import { fetcher } from "@/utils/fetcher";

const useServiceAPI = () => {
  async function get(serviceId: number) {
    const res = await fetcher(`/services/${serviceId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch service");
    }
    return res.json<Service>();
  }

  async function getAllByHomeOwnerId(homeOwnerId: number) {
    const res = await fetcher(`/services/howner/${homeOwnerId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch services");
    }
    return res.json<Service[]>();
  }

  async function getAll() {
    const res = await fetcher("/services");
    if (!res.ok) {
      throw new Error("Failed to fetch services");
    }
    return res.json<Service[]>();
  }

  async function getAllByCleanerId(cleanerId: number) {
    const res = await fetcher(`/services/cleaner/${cleanerId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch services");
    }
    return res.json<Service[]>();
  }

  async function create(serviceToCreate: CreateServiceWithId) {
    const res = await fetcher("/services", {
      method: "POST",
      json: serviceToCreate,
    });
    const resData = await res.json<{
      service: { serviceID: number; category: string; price: number };
    }>();
    const data = resData.service;
    const ret: OfferedService = {
      serviceID: data.serviceID,
      cleanerID: serviceToCreate.cleanerID,
      category: data.category,
      price: data.price.toFixed(2).toString(),
      shortlistCount: 0,
      view: 0,
    };
    return ret;
  }

  async function edit(serviceToEdit: EditService) {
    const res = await fetcher(`/services/${serviceToEdit.serviceID}`, {
      method: "PUT",
      json: {
        category: serviceToEdit.category,
        price: serviceToEdit.price,
        cleanerID: serviceToEdit.cleanerID,
      },
    });
    const resData = await res.json<{
      service: { serviceID: number; category: string; price: number };
    }>();
    const data = resData.service;
    const ret: OfferedService = {
      serviceID: data.serviceID,
      cleanerID: serviceToEdit.cleanerID,
      category: data.category,
      price: data.price.toFixed(2).toString(),
      view: serviceToEdit.view,
      shortlistCount: serviceToEdit.shortlistCount,
    };
    return ret;
  }

  async function remove(serviceId: number) {
    const res = await fetcher(`/services/${serviceId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete service");
    }
    return serviceId;
  }

  async function createShortlist(data: { service: Service; hownerID: number }) {
    const res = await fetcher("/shortlists", {
      method: "POST",
      json: { serviceID: data.service.serviceID, hownerID: data.hownerID },
    });
    if (!res.ok) {
      throw new Error("Failed to create shortlist");
    }
    return data.service;
  }

  async function removeShortlist(data: { service: Service; hownerID: number }) {
    const res = await fetcher(`/shortlists`, {
      method: "DELETE",
      json: { serviceID: data.service.serviceID, hownerID: data.hownerID },
    });
    if (!res.ok) {
      throw new Error("Failed to remove shortlist");
    }
    return data.service.serviceID;
  }

  return {
    get,
    getAll,
    getAllByHomeOwnerId,
    getAllByCleanerId,
    create,
    edit,
    remove,
    createShortlist,
    removeShortlist,
  };
};

export { useServiceAPI };
