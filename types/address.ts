export type TAddress = {
  _id: string;
  area: string;
  email: string;
  fullname: string;
  goverment: string;
  phone: number;
  street: string;
  user: string;
  
  building: string;
  apartment: number;
  floor: number;
};

export type TGetAddressReturn = {
  addresses: TAddress[];
};
