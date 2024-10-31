import Navbar from "@/components/organism/navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateLocationForm from "./form"

export default function CreateLocations() {
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
            <CreateLocationForm />
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
