import api from '@/app/api/api'
import { redirect } from 'next/navigation'

import Navbar from '@/components/organism/navbar'
import { SidebarInset } from '@/components/ui/sidebar'
import LocationCard from './card'

import { Location } from '@/types/types'

export default async function ShowLocation({ params }: { params: Promise<{ id: string }> }) {
  const decodedParam = decodeURIComponent((await params).id)
  const separatedParams = decodedParam.split('&id=')
  const id = separatedParams[1]

  return api
    .get(`locations/${id}`)
    .then(({ data }: { data: Location }) => {
      return (
        <SidebarInset>
          <Navbar />
          <main className="p-6">
            <LocationCard data={data} />
          </main>
        </SidebarInset>
      )
    })
    .catch(() => {
      redirect('/dashboard/locations')
    })
}
