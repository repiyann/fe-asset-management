import Navbar from "@/components/organism/navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateDepreciationForm from "./form"

export default function CreateDepreciation() {
  return (
    <SidebarInset>
      <Navbar />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Depreciation</CardTitle>
            <CardDescription>Add new depreciation</CardDescription>
          </CardHeader>
          <CardContent>
            <CreateDepreciationForm />
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
