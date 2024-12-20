import Navbar from '@/components/organism/navbar'
import { SidebarInset } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CreateAccuDepreciationForm from './form'

export default function CreateAccuDepreciation() {
  return (
    <SidebarInset>
      <Navbar />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Accumulation Depreciation</CardTitle>
            <CardDescription>Add new accumulation depreciation</CardDescription>
          </CardHeader>
          <CardContent>
            <CreateAccuDepreciationForm />
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
