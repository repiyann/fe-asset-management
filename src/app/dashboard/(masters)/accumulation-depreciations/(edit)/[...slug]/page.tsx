import api from '@/app/api/api'
import { redirect } from 'next/navigation'

import Navbar from '@/components/organism/navbar'
import { SidebarInset } from '@/components/ui/sidebar'
import EditAccuDepreciationForm from './form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { MasterData } from '@/types/types'

export default async function EditAccuDepreciation({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const decodedParam = decodeURIComponent((await params).slug[0])
  const separatedParams = decodedParam.split('&id=')
  const id = separatedParams[1]

  return api
    .get(`accu-depreciations/${id}`)
    .then(({ data }: { data: MasterData }) => {
      return (
        <SidebarInset>
          <Navbar />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Accumulation Depreciation</CardTitle>
                <CardDescription>Edit accumulation depreciation</CardDescription>
              </CardHeader>
              <CardContent>
                <EditAccuDepreciationForm data={data} />
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      )
    })
    .catch(() => {
      redirect('/dashboard/accu-depreciations')
    })
}
