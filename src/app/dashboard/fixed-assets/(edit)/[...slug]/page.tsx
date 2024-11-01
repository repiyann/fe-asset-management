import api from "@/app/api/api";
import { redirect } from "next/navigation";

import Navbar from "@/components/organism/navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import EditFixedAssetForm from "./form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MasterData } from "@/types/types";

export default async function EditFixedAsset({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const decodedParam = decodeURIComponent((await params).slug[0]);
  const separatedParams = decodedParam.split("&id=");
  const id = separatedParams[1];

  return api
    .get(`fixed-assets/${id}`)
    .then(({ data }: { data: MasterData }) => {
      return (
        <SidebarInset>
          <Navbar />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Fixed Asset</CardTitle>
                <CardDescription>Edit Fixed Asset</CardDescription>
              </CardHeader>
              <CardContent>
                <EditFixedAssetForm data={data} />
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      );
    })
    .catch(() => {
      redirect("/dashboard/fixed-assets");
    });
}
