import api from "@/app/api/api";
import { redirect } from "next/navigation";

import Navbar from "@/components/organism/navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import CategoryCard from "./card";

import { MasterData } from "@/types/types";

export default async function ShowCategory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const decodedParam = decodeURIComponent((await params).id);
  const separatedParams = decodedParam.split("&id=");
  const id = separatedParams[1];

  return api
    .get(`categories/${id}`)
    .then(({ data }: { data: MasterData }) => {
      return (
        <SidebarInset>
          <Navbar />
          <main className="p-6">
            <CategoryCard data={data} />
          </main>
        </SidebarInset>
      );
    })
    .catch(() => {
      redirect("/dashboard/categories");
    });
}
