import api from "@/app/api/api";

import Navbar from "@/components/organism/navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditLocationForm from "./form";

export default async function EditLocation({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const decodedParam = decodeURIComponent((await params).slug[0]);
  const separatedParams = decodedParam.split('&id=');
  const id = separatedParams[1]
  const response = await api.get(`locations/${id}`);
  const location = response.data.data;

  return (
    <SidebarInset>
      <Navbar />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Locations</CardTitle>
            <CardDescription>Add new locations</CardDescription>
          </CardHeader>
          <CardContent>
            <EditLocationForm data={location} />
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
