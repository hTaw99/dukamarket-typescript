"use client";
import { useGetProducts } from "@/apis/products";
import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import SearchList from "./SearchList";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);

  const listRef = useOutsideClick(() => setIsListOpen(false), isListOpen);

  const debouncedValue = useDebounce(query, 700);
  const queries = {
    name: debouncedValue,
  };

  // #####################################################
  const { data, isFetching } = useGetProducts({
    queries,
    enabled: !!debouncedValue,
  });

  // #####################################################

  return (
    <div className=" w-full md:w-2/5 order-3 md:order-2 relative">
      <form className="z-10">
        <div className="flex">
          <div ref={listRef} className="w-full">
            <input
              onClick={() => (isListOpen ? undefined : setIsListOpen(true))}
              className={`rounded-t-lg ${
                isListOpen ? "rounded-b-none" : "rounded-b-lg "
              }  rtl:border-r-2 rtl:border-r-gray-50 ltr:border-l-2 ltr:border-l-gray-50 z-20 block w-full p-3 md:p-4 text-sm text-gray-900 border 
                     border-gray-300  bg-gray-50 placeholder:capitalize focus:outline-none`}
              placeholder="search"
              name="search"
              onChange={(event) => setQuery(event.target.value)}
            />

            {isFetching && (
              <ImSpinner8
                className="animate-spin absolute top-4 right-5 text-gray-600"
                size={20}
              />
            )}

            {isListOpen && (
              <SearchList
                isFetching={isFetching}
                debouncedValue={debouncedValue}
                pages={data?.pages}
                setIsListOpen={setIsListOpen}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
