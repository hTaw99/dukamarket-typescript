"use client";

import React, { useMemo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { removeAllFilters, removeFilter } from "@/store/features/filterSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Button } from "@/components/ui/button";
import { TFilterState } from "@/types/filter";

export default React.memo(function SelectedFilters() {
  const { filters } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const selectedFilters = useMemo(() => {
    let arr: [string, string][] = [];

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) => arr.push([key, v.split(",")[1]]));
        } else arr.push([key, value.split(",")[1]]);
      }
    });
    return arr;
  }, [filters]);

  return (
    <div className="flex flex-wrap gap-2">
      {selectedFilters?.map((filter) => (
        <div
          key={filter[1]}
          className="flex gap-2 cursor-default items-center px-6 py-2 border border-gray-300 rounded-full"
        >
          <AiOutlineClose
            size={16}
            onClick={() =>
              dispatch(removeFilter({ name: filter[0] as keyof TFilterState, value: filter[1] }))
            }
            className="cursor-pointer"
          />
          <span className="capitalize">{filter[0]}</span> -{" "}
          <span className="capitalize">{filter[1]}</span>
        </div>
      ))}
      {selectedFilters.length > 1 && (
        <Button
          onClick={() => dispatch(removeAllFilters())}
          variant={"link"}
          className="capitalize bg-primary/5 text-primary rounded-full"
        >
          clear all
        </Button>
      )}
    </div>
  );
});
