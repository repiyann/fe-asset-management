import api from "@/app/api/api";
import { redirect } from "next/navigation";

import Navbar from "@/components/organism/navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import CategoryCard from "./card";

import { ApiError } from "@/types/types";

export default async function ShowCategory({
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
    const response = await api.get(`categories/${id}`);
    data = response.data.data;
    message = response.data.message;
    console.log("message:", message);
  } catch (error) {
    const apiError = error as ApiError;
    message = apiError.response?.data.message;
    console.log("message:", message);
    redirect("/dashboard/categories");
  }

  return (
    <SidebarInset>
      <Navbar />
      <main className="p-6">
        <CategoryCard data={data} />
      </main>
    </SidebarInset>
  );
}
