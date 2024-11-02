import api from '@/app/api/api'
import { redirect } from 'next/navigation'

import Navbar from '@/components/organism/navbar'
import { SidebarInset } from '@/components/ui/sidebar'
import EditLocationForm from './form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Location } from '@/types/types'

export default async function EditLocation({ params }: { params: Promise<{ slug: string[] }> }) {
  const decodedParam = decodeURIComponent((await params).slug[0])
  const separatedParams = decodedParam.split('&id=')
  const id = separatedParams[1]

  return api
    .get(`locations/${id}`)
    .then(({ data }: { data: Location }) => {
      return (
        <SidebarInset>
          <Navbar />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>Edit location</CardDescription>
              </CardHeader>
              <CardContent>
                <EditLocationForm data={data} />
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      )
    })
    .catch(() => {
      redirect('/dashboard/locations')
    })
}
