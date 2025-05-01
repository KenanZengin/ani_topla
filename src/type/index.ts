
export interface PlanRule {
  maxFile: number | null;
  maxFileDuration: number;
  maxUploadDuration: number;
  maxFileUploadBeforeEvent: number;
}

export interface Plan {
  name: string;
  id: string;
  price_id: string;
  price: number;
  currency: string;
  formattedPrice: string;
  benefits: string[];
  rules: PlanRule;
}

 
export interface User {
  id: number;
  random_id: string;
  detected_id: string | null;
  fullname: string | null;
  created_at: string;
  last_session_time: string;
  firebase_uuid: string;
  phone: string | null;
  email: string;
  deleted: number;
  st_dev_id: string | null;
  st_live_id: string | null;
}