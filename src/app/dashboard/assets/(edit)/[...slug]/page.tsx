import api from '@/app/api/api'
import { redirect } from 'next/navigation'

import Navbar from '@/components/organism/navbar'
import { SidebarInset } from '@/components/ui/sidebar'
import EditAssetForm from './form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { AssetEditProps } from '@/types/types'
import { getMaster } from '@/lib/asset'

export default async function EditAsset({ params }: { params: Promise<{ slug: string[] }> }) {
  const decodedParam = decodeURIComponent((await params).slug[0])
  const separatedParams = decodedParam.split('&id=')
  const id = separatedParams[1]

  const { locations, categories, depreciations, fixedAssets, accuDepreciations } = await getMaster()

  return api
    .get(`assets/${id}`)
    .then(({ data }: { data: AssetEditProps }) => {
      return (
        <SidebarInset>
          <Navbar />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Asset</CardTitle>
                <CardDescription>Edit Asset</CardDescription>
              </CardHeader>
              <CardContent>
                <EditAssetForm
                  data={data}
                  locations={locations}
                  categories={categories}
                  depreciations={depreciations}
                  fixedAssets={fixedAssets}
                  accuDepreciations={accuDepreciations}
                />
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      )
    })
    .catch(() => {
      redirect('/dashboard/assets')
    })
}
