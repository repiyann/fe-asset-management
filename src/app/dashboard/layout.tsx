import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardSidebar from '@/components/organism/sidebar'
import { getServerAuthSession } from '@/lib/auth'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession()
  const fullName = session?.user.fullName
  const email = session?.user.email

  return (
    <SidebarProvider>
      <DashboardSidebar name={fullName} email={email} />
      {children}
    </SidebarProvider>
  )
}
