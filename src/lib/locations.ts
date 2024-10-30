import api from "@/app/api/api";
import { LocationsResponse } from "@/types/locations"

export async function getLocations(options: {
  page?: number;
}): Promise<LocationsResponse> {
  let url = "locations";
  const queryParams: string[] = [];

  if (options.page !== undefined || options.page !== null) {
    queryParams.push(`page=${options.page}`);
  }

  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }
  const response = await api.get(url);

  return response.data as LocationsResponse
}
