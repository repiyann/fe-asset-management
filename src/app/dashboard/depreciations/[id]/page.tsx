import api from "@/app/api/api";
import { redirect } from "next/navigation";

import Navbar from "@/components/organism/navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import DepreciationCard from "./card";
import { Depreciation } from "@/types/types";

export default async function ShowDepreciation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const decodedParam = decodeURIComponent((await params).id);
  const separatedParams = decodedParam.split("&id=");
  const id = separatedParams[1];

  return api
    .get(`depreciations/${id}`)
    .then(({ data }: { data: Depreciation }) => {
      return (
        <SidebarInset>
          <Navbar />
          <main className="p-6">
            <DepreciationCard data={data} />
          </main>
        </SidebarInset>
      );
    })
    .catch(() => {
      redirect("/dashboard/depreciations");
    });
}
