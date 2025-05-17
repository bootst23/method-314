export interface Service extends OfferedService {
  username: string;
}

export interface CreateService {
  category: string;
  price: number;
}

export interface CreateServiceWithId extends CreateService {
  cleanerID: number;
}

export interface EditService extends CreateServiceWithId {
  serviceID: number;
  shortlistCount: number;
  view: number;
}

export interface OfferedService {
  serviceID: number;
  cleanerID: number;
  category: string;
  price: string;
  shortlistCount: number;
  view: number;
}
