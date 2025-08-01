declare interface ActionsResponse<T> {
  message: string;
  status: boolean;
  type: string;
  data: T;
  errors?: {
    [key: string]: string;
  };
}

declare interface ApiResponse<T> {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    active: boolean;
    label: string | number;
    url: string;
  }[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
  data: T;
}

export interface ApplicationSettingInterface {
  establishment: {
    company_name: string;
    cnpj: string;
    email: string;
    status: string;
    address: string;
    postal_code: string;
    phone: string;
  };
  application: {
    app_name: string;
  };
  categories: string[];
}

export interface FormAddressInterface {
  cep: string;
  address: string;
  number: string;
  complement: string;
  district: string;
  state: string;
  city: string;
  city_ibge: string;
  city_gia: string;
  city_siafi: string;
  description: string;
  default: "Y" | "N";
}

export interface AddressInterface extends FormAddressInterface {
  id: number;
  customer_id: number;
  created_at: string;
  updated_at: string;
}
