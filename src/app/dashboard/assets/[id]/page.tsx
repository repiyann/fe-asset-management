import api from '@/app/api/api'
import { redirect } from 'next/navigation'

import Navbar from '@/components/organism/navbar'
import { SidebarInset } from '@/components/ui/sidebar'
import AssetCard from './card'

import { Asset } from '@/types/types'

export default async function ShowAsset({ params }: { params: Promise<{ id: string }> }) {
  const decodedParam = decodeURIComponent((await params).id)
  const separatedParams = decodedParam.split('&id=')
  const id = separatedParams[1]

  return api
    .get(`assets/${id}`)
    .then(({ data }: { data: Asset }) => {
      return (
        <SidebarInset>
          <Navbar />
          <main className="p-6">
            <AssetCard data={data} />
          </main>
        </SidebarInset>
      )
    })
    .catch(() => {
      redirect('/dashboard/assets')
    })
}
