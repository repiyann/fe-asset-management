import {
  Pagination,
  PaginationContent,
  PaginationLink,
} from "@/components/ui/pagination";
import type { Meta } from "@/lib/clients";
import { cn } from "@/lib/utils";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function MyPagination({ meta }: { meta: Meta }) {
  const { total_pages, page } = meta;
  // const location = useLocation();

  const isAnyParams = location.search !== "";

  const params = new URLSearchParams(location.search);
  params.delete("page");

  const renderPageNumber = () => {
      const pageNumbers = [];
      const totalPagesToLeft = Math.min(4, page - 1);
      const totalPagesToRight = Math.min(5, total_pages - page);
      for (let i = page - totalPagesToLeft; i < page; i++) {
          if (i > 0) {
              params.set("page", i.toString());
              pageNumbers.push(
                  <PaginationLink
                      key={i}
                      href={${location.pathname}?${params}}
                      isActive={i === page}
                  >
                      {i}
                  </PaginationLink>,
              );
          }
      }
      params.set("page", page.toString());
      pageNumbers.push(
          <PaginationLink
              key={page}
              href={${location.pathname}?${params}}
              isActive
          >
              {page}
          </PaginationLink>,
      );

      for (let i = page + 1; i <= page + totalPagesToRight; i++) {
          if (i <= total_pages) {
              params.set("page", i.toString());
              pageNumbers.push(
                  <PaginationLink
                      key={i}
                      href={${location.pathname}?${params}}
                      isActive={i === page}
                  >
                      {i}
                  </PaginationLink>,
              );
          }
      }
      return pageNumbers;
  };
  return (
      <Pagination>
          <PaginationContent>
              <PaginationLink
                  href={`${location.pathname}${
                      isAnyParams ? "&" : "?"
                  }page=1`}
                  className={cn(
                      page === 1 && "pointer-events-none text-gray-500",
                  )}
              >
                  <ChevronsLeft className="w-5 h-5" />
              </PaginationLink>
              <PaginationLink
                  href={`${location.pathname}${isAnyParams ? "&" : "?"}page=${
                      page - 1
                  }`}
                  className={cn(
                      page === 1 && "pointer-events-none text-gray-500",
                  )}
              >
                  <ChevronLeft className="w-5 h-5" />
              </PaginationLink>

              {renderPageNumber()}

              <PaginationLink
                  href={`${location.pathname}${isAnyParams ? "&" : "?"}page=${
                      page + 1
                  }`}
                  className={cn(
                      page === total_pages &&
                          "pointer-events-none text-gray-500",
                  )}
              >
                  <ChevronRight className="w-5 h-5" />
              </PaginationLink>
              <PaginationLink
                  href={`${location.pathname}${
                      isAnyParams ? "&" : "?"
                  }page=${total_pages}`}
                  className={cn(
                      page === total_pages &&
                          "pointer-events-none text-gray-500",
                  )}
              >
                  <ChevronsRight className="w-5 h-5" />
              </PaginationLink>
          </PaginationContent>
      </Pagination>
  );
}