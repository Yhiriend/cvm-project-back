export interface DbServiceRequest {
  id?: number;
  reference_code: string;
  service_type: string;
  request_date: string;

  customer_name: string;
  customer_surname: string;
  customer_address: string;
  customer_phone: string;

  product_brand: string;
  product_type: string;
  product_tech: string;
  product_voltage: string;
  product_aditional_info: string;
}
