import api from "@/app/api/api";
import { redirect } from "next/navigation";

import Navbar from "@/components/organism/navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import LocationCard from "./card";

import { ApiError } from "@/types/types";

export default async function ShowLocation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const decodedParam = decodeURIComponent((await params).id);
  const separatedParams = decodedParam.split("&id=");
  const id = separatedParams[1];

  let data;
  let message;
  try {
    const response = await api.get(`locations/${id}`);
    data = response.data.data;
    message = response.data.message;
    console.log("message:", message);
  } catch (error) {
    const apiError = error as ApiError;
    message = apiError.response?.data.message;
    console.log("message:", message);
    redirect("/dashboard/locations");
  }

  return (
    <SidebarInset>
      <Navbar />
      <main className="p-6">
        <LocationCard data={data} />
      </main>
    </SidebarInset>
  );
}
