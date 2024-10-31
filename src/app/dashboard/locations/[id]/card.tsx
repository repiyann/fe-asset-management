"use client";

import { useRouter } from "next/navigation";

import api from "@/app/api/api";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2, MapPin, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Location } from "@/types/types";

export default function LocationCard({ data }: { data: Location }) {
  const router = useRouter();

  function handleEdit(id: string) {
    router.push(`/dashboard/locations/${id}/edit`);
  }

  async function handleDelete(id: string) {
    toast.dismiss();
    try {
      await api.delete(`${process.env.NEXT_PUBLIC_API_URL}/locations/${id}`);
      toast.success("Lokasi berhasil dihapus");
      router.back();

      setTimeout(() => {
        router.refresh();
      }, 500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error(error instanceof Error ? error.message : "Unknown error");
      }
    }
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <a href="/dashboard/locations">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Locations
            </Button>
          </a>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(data.id)}
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
          {data ? (
            <>
              <div className="grid gap-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Office Name
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
            </>
          ) : (
            <div>Loading...</div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
