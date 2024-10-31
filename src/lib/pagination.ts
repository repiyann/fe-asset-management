import api from "@/app/api/api";
import { Response } from "@/types/types"

export async function getPaginationData<T>(url: string, options: {
  page?: number;
}): Promise<Response<T>> {
  const queryParams: string[] = [];

  if (options.page !== undefined || options.page !== null) {
    queryParams.push(`page=${options.page}`);
  }

  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }
  const response = await api.get(url);

  return response.data as Response<T>
}
