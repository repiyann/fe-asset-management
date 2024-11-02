import Navbar from '@/components/organism/navbar'
import { SidebarInset } from '@/components/ui/sidebar'

export default function page() {
  return (
    <SidebarInset>
      <Navbar />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        Jancok
      </div>
    </SidebarInset>
  )
}
