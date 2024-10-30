"use client";

import React from "react";
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
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const paths = pathname.split("/").filter((x) => x);
    return paths.map((path, index) => ({
      name: path.charAt(0).toUpperCase() + path.slice(1),
      href: `/${paths.slice(0, index + 1).join("/")}`,
    }));
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
