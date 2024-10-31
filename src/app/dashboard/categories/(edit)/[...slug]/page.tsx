import api from "@/app/api/api";
import { redirect } from "next/navigation"

import Navbar from "@/components/organism/navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import EditCategoryForm from "./form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ApiError } from "@/types/types"

export default async function EditCategory({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const decodedParam = decodeURIComponent((await params).slug[0]);
  const separatedParams = decodedParam.split("&id=");
  const id = separatedParams[1]

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
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Category</CardTitle>
            <CardDescription>Edit category</CardDescription>
          </CardHeader>
          <CardContent>
            <EditCategoryForm data={data} />
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
