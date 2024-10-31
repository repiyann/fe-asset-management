import api from "@/app/api/api";

import Navbar from "@/components/organism/navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import LocationCard from "./card";

export default async function ShowLocation({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const decodedParam = decodeURIComponent((await params).id);
  const separatedParams = decodedParam.split('&id=');
  const response = await api.get(`locations/${separatedParams[1]}`);
  const location = response.data.data;

  return (
    <SidebarInset>
      <Navbar />
      <main className="p-6">
        <LocationCard data={location} />
      </main>
    </SidebarInset>
  );
}
