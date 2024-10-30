import { File, ListFilter, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import LocationsTable from "./table";
import Navbar from "@/components/organism/navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { getLocations } from "@/lib/locations";

export default async function Locations({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined | number };
}) {
  const page = Number(searchParams.page) || 1;
  const response = await getLocations({
    page,
  });

  const {meta, data: locations} = response.data;
  const pageMetadata = meta;
  const baseUrl = "/dashboard/locations";

  return (
    <SidebarInset>
      <Navbar />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Locations</CardTitle>
            <CardDescription>Manage your office locations.</CardDescription>
          </CardHeader>
          <div className="flex items-center pr-10">
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </div>
          </div>
          <CardContent>
            <LocationsTable
              data={locations}
              currentPage={page}
              perPage={pageMetadata.perPage}
            />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Showing <strong>1</strong> to{" "}
              <strong>
                {pageMetadata.total < 10
                  ? pageMetadata.total
                  : pageMetadata.perPage}
              </strong>{" "}
              of <strong>{pageMetadata.total}</strong> locations
            </div>
            <div className="ml-auto">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={
                        page > 1 ? `${baseUrl}?page=${page - 1}` : undefined
                      }
                      className={
                        page > pageMetadata.firstPage ? "" : "cursor-default"
                      }
                    />
                  </PaginationItem>
                  {pageMetadata.lastPage > 5 ? (
                    <>
                      <PaginationItem>
                        <PaginationLink href={`${baseUrl}?page=1`}>
                          {pageMetadata.firstPage}
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href={`${baseUrl}?page=${pageMetadata.currentPage}`}
                          isActive
                        >
                          {pageMetadata.currentPage}
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href={`${baseUrl}?page=${pageMetadata.lastPage}`}
                        >
                          {pageMetadata.lastPage}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  ) : (
                    Array.from({ length: pageMetadata.lastPage }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href={`${baseUrl}?page=${i + 1}`}
                          isActive={pageMetadata.currentPage === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href={
                        page < pageMetadata.lastPage
                          ? `${baseUrl}?page=${page + 1}`
                          : undefined
                      }
                      className={
                        page < pageMetadata.lastPage ? "" : "cursor-default"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardFooter>
        </Card>
      </div>
    </SidebarInset>
  );
}
