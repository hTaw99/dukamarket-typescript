import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: { queries: { retry: 0, refetchOnWindowFocus: false } },
    })
);
export default getQueryClient;
