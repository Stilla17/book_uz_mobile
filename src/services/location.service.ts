import { api } from "@/api/client";
import { ApiResponse } from "@/types/auth.types";
import { District, Region } from "@/types/location.types";

export const locationService = {
  getRegions: async (): Promise<Region[]> => {
    const response = await api.get<ApiResponse<Region[]>>("/locations/regions");
    return response.data.data ?? [];
  },

  getDistricts: async (regionId: string): Promise<District[]> => {
    const response = await api.get<ApiResponse<District[]>>(
      `/locations/regions/${encodeURIComponent(regionId)}/districts`,
    );

    return response.data.data ?? [];
  },
};
