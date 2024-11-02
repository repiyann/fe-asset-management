import Navbar from '@/components/organism/navbar'
import { SidebarInset } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CreateCategoryForm from './form'

export default function CreateCategory() {
  return (
    <SidebarInset>
      <Navbar />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Category</CardTitle>
            <CardDescription>Add new category</CardDescription>
          </CardHeader>
          <CardContent>
            <CreateCategoryForm />
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
