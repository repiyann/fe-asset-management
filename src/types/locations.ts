export interface Location {
  id: string;
  code: number;
  name: string;
  address: string;
}

export interface Meta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export interface LocationsTableProps {
  data: Location[];
  currentPage: number;
  perPage: number;
}

export interface LocationsResponse {
  status: string;
  message: string;
  data: {
    meta: Meta;
    data: Location[];
  };
}