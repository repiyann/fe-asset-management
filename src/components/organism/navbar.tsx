"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Navbar() {
  const pathname = usePathname();

  function slugToTitle(slug: string) {
    let title = slug.replace(/-/g, " ");
    title = title.replace(/_/g, " - ");
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return title;
  }

  const breadcrumbs = useMemo(() => {
    const cleanPathname = pathname.split("&id=")[0];
    const paths = cleanPathname.split("/").filter((x) => x);
    if (pathname.endsWith("/edit")) {
      paths[paths.length] = "edit";
    }

    const href = pathname
      .split("/")
      .filter((x) => x)
      .slice(0, -1);

    return paths.map((path, index) => {
      const title = slugToTitle(path);
      return {
        name: title,
        href: `/${href.slice(0, index + 1).join("/")}`,
      };
    });
  }, [pathname]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.slice(0, -1).map((breadcrumb, index) => (
              <React.Fragment key={breadcrumb.href}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={breadcrumb.href}>
                    {breadcrumb.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  className="hidden md:block"
                  key={`separator-${index}`}
                />
              </React.Fragment>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage>
                {breadcrumbs[breadcrumbs.length - 1]?.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
