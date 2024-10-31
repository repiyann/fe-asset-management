export interface SearchParams {
  [key: string]: string | string[] | undefined | number;
}

interface Meta {
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

export interface Response<T> {
  status: string;
  message: string;
  data: {
    meta: Meta;
    data: T;
  };
}

export interface Location {
  id: string;
  code: number;
  name: string;
  address: string;
}

export interface LocationsTableProps {
  data: Location[];
  currentPage: number;
  perPage: number;
}

export interface Category {
  id: string;
  code: number;
  name: string;
}

export interface CategoriesTableProps {
  data: Category[];
  currentPage: number;
  perPage: number;
}
