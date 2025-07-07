export interface ProjectWithLocation {
  project_approval_id: string;
  project_name: string;
  total_amount: number;
  supply_amount: number;
  issued_at: string;
  approval_number: string;
  location_name: string | null;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
}

export interface LocationData {
  id: number;
  address: string;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
}

export interface Project {
  approval_number: string;
  name: string;
  issued_at: string;
  total_amount: number;
}
