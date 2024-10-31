"use client";

import api from "@/app/api/api";
import { useRouter } from "next/navigation";

import { ArrowLeft, Building2, MapPin, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Location } from "@/types/types";
import { generateSlug } from "@/lib/utils";

export default function LocationCard({ data }: { data: Location }) {
  const router = useRouter();

  function handleEdit(id: string, name: string) {
    const slug = generateSlug(name);
    router.push(`/dashboard/locations/${slug}&id=${id}/edit`);
  }

  async function handleDelete(id: string) {
    toast.dismiss();
    try {
      await api.delete(`locations/${id}`);
      toast.success("Location successfully deleted");
      router.back();

      setTimeout(() => {
        router.refresh();
      }, 500);
    } catch (error: unknown) {
      console.log("error:", error);
      toast.error("Failed to delete location");
    }
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(data.id, data.name)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(data.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Location Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <div className="text-sm font-medium text-muted-foreground">
              Location Name
            </div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {data.name}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium text-muted-foreground">
              Address
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              {data.address}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
