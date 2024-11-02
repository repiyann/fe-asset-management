import api from '@/app/api/api'
import { Location, MasterData } from '@/types/types'

export async function getMaster() {
  const locations = await api.get<Location[]>('locations')
  const categories = await api.get<MasterData[]>('categories')
  const depreciations = await api.get<MasterData[]>('depreciations')
  const fixedAssets = await api.get<MasterData[]>('fixed-assets')
  const accuDepreciations = await api.get<MasterData[]>('accu-depreciations')

  return {
    locations: locations.data,
    categories: categories.data,
    depreciations: depreciations.data,
    fixedAssets: fixedAssets.data,
    accuDepreciations: accuDepreciations.data,
  }
}
