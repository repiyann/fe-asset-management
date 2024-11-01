import api from "@/app/api/api";
import { redirect } from "next/navigation";

import Navbar from "@/components/organism/navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import EditDepreciationForm from "./form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Depreciation } from "@/types/types";

export default async function EditDepreciation({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const decodedParam = decodeURIComponent((await params).slug[0]);
  const separatedParams = decodedParam.split("&id=");
  const id = separatedParams[1];

  return api
    .get(`depreciations/${id}`)
    .then(({ data }: { data: Depreciation }) => {
      return (
        <SidebarInset>
          <Navbar />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Depreciation</CardTitle>
                <CardDescription>Edit Depreciation</CardDescription>
              </CardHeader>
              <CardContent>
                <EditDepreciationForm data={data} />
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      );
    })
    .catch(() => {
      redirect("/dashboard/depreciations");
    });
}
