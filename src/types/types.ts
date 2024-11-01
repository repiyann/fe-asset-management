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

export interface ResponsePaginated<T> {
  meta: Meta;
  data: T;
}

export interface ApiError {
  response?: { data: { message: string } };
}

export interface Location {
  id: string;
  code: number;
  name: string;
  address: string;
}

export interface LocationsTableProps {
  datas: Location[];
  currentPage: number;
  perPage: number;
}

export interface Category {
  id: string;
  code: number;
  name: string;
}

export interface CategoriesTableProps {
  datas: Category[];
  currentPage: number;
  perPage: number;
}

export interface Depreciation {
  id: string;
  code: string;
  name: string;
}

export interface DepreciationsTableProps {
  datas: Depreciation[];
  currentPage: number;
  perPage: number;
}
