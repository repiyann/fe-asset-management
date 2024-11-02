import Navbar from '@/components/organism/navbar'
import { SidebarInset } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CreateFixedAssetForm from './form'

export default function CreateFixedAsset() {
  return (
    <SidebarInset>
      <Navbar />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Fixed Asset</CardTitle>
            <CardDescription>Add new fixed asset</CardDescription>
          </CardHeader>
          <CardContent>
            <CreateFixedAssetForm />
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
