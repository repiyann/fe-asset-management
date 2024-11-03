export interface SearchParams {
  [key: string]: string | string[] | undefined | number
}

interface Meta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string | null
  previousPageUrl: string | null
}

export interface ResponsePaginated<T> {
  meta: Meta
  data: T
}

export interface ResponseAsset<T> {
  data: T
}

export interface Location {
  id: string
  code: number
  name: string
  address: string
}

export interface LocationsTableProps {
  datas: Location[]
  currentPage: number
  perPage: number
}

export interface MasterData {
  id: string
  code: number
  name: string
}

export interface MasterDataTableProps {
  datas: MasterData[]
  currentPage: number
  perPage: number
}

export interface Asset {
  id: string
  customNumber: number
  name: string
  location: Location
  category: MasterData
  fixedAsset: MasterData
  description: string
  acquisitionCost: number
  acquisitionDate: string
  nonDepreciation: boolean
  method: string
  depreciation: MasterData
  accuDepreciation: MasterData
}

export interface CreateAssetFormProps {
  locations: Location[]
  categories: MasterData[]
  depreciations: MasterData[]
  fixedAssets: MasterData[]
  accuDepreciations: MasterData[]
}

export interface EditAssetFormProps {
  data: AssetEditProps
  locations: Location[]
  categories: MasterData[]
  depreciations: MasterData[]
  fixedAssets: MasterData[]
  accuDepreciations: MasterData[]
}

export interface AssetEditProps {
  id: string
  customNumber: number
  name: string
  location: Location
  category: MasterData
  fixedAsset: MasterData
  description: string
  acquisitionCost: number
  acquisitionDate: string
  nonDepreciation: boolean
  method: string
  depreciation: MasterData
  accuDepreciation: MasterData
  transaction: Transactions
}


export interface AssetTableProps {
  datas: Asset[]
  currentPage: number
  perPage: number
}

export interface Transactions {
  id: string
  asset_id: number
  name: string
  acquisitionCost: number
  acquisitionDate: string
  usagePeriod: number
  usageValuePerYear: number
}
