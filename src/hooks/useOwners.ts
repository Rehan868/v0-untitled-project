import { Owner } from '@/services/supabase-types';
import { fetchOwners } from '@/services/api';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useOwners = () => {
  return useQuery({
    queryKey: ["owners"],
    queryFn: async () => {
      return await fetchOwners();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useOwner = (id: string) => {
  return useQuery({
    queryKey: ["owner", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('owners')
        .select('*, rooms(*)')
        .eq('id', id)
        .single();
      
      if (error) {
        throw new Error(`Owner with ID ${id} not found: ${error.message}`);
      }
      
      return data as Owner;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Add function to get owner-specific rooms
export const useOwnerRooms = (ownerId: string) => {
  return useQuery({
    queryKey: ["ownerRooms", ownerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('owner_id', ownerId);
      
      if (error) {
        throw new Error(`Failed to fetch owner rooms: ${error.message}`);
      }
      
      return data;
    },
    enabled: !!ownerId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
