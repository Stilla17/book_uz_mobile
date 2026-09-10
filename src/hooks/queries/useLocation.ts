import { locationService } from "@/services/location.service";
import { useQuery } from "@tanstack/react-query";

export const useRegions = () => {
  return useQuery({
    queryKey: ["regions"],
    queryFn: locationService.getRegions,
    staleTime: Infinity,
  });
};

export const useDistricts = (regionId?: string) => {
  return useQuery({
    queryKey: ["districts", regionId],
    queryFn: () => locationService.getDistricts(regionId!),
    enabled: Boolean(regionId),
    staleTime: Infinity,
  });
};
