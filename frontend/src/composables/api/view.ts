import { fetcher } from "@/utils/fetcher";

const useViewAPI = () => {
  async function incrementView(serviceID: number, accountID: number) {
    try {
      const res = await fetcher(`/views`, {
        method: "POST",
        json: { serviceID, accountID },
      });
      if (!res.ok) {
        throw new Error("Failed to increment view");
      }
      return res.json<{ view: number }>();
    } catch (error) {
      throw new Error("An error occurred while incrementing the view");
    }
  }

  return { incrementView };
};

export { useViewAPI };
