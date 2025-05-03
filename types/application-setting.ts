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
