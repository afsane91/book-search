// features/books/useSearchBooks.ts
import { useQuery } from "@tanstack/react-query";
import type { OLSearchResponse, OLDoc } from "@/types";
import { fetchBooks } from "../../lib/fetcher";

export function useSearchBooks(query: string, limit = 10) {
  console.log(query,'queryqueryquery')
  return useQuery<OLSearchResponse, Error, OLDoc[]>({
    queryKey: ["ol-search", query, limit],
    queryFn: () => {
   
      return fetchBooks(query, 1);
    },
    enabled: query.trim().length > 3, // فقط وقتی query خالی نیست
    staleTime: 60_000,
    select: (data) => data.docs.slice(0, limit),
  });
}