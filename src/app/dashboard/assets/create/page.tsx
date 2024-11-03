import Navbar from '@/components/organism/navbar'
import { SidebarInset } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CreateAssetForm from './form'
import { getMaster } from '@/lib/asset'

export default async function CreateAsset() {
  const { locations, categories, depreciations, fixedAssets, accuDepreciations } = await getMaster()
  return (
    <SidebarInset>
      <Navbar />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Asset</CardTitle>
            <CardDescription>Add new asset</CardDescription>
          </CardHeader>
          <CardContent>
            <CreateAssetForm
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
}
