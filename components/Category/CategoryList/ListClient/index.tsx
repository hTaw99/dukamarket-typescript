"use client";

import { useAppDispatch } from "@/hooks/redux";
import { setFilters } from "@/store/features/filterSlice";
import Link from "next/link";

const ListClient = ({ _id, name }: { _id: string; name: string }) => {
  const dispatch = useAppDispatch();

  return (
    <li className="hover:text-red-500 hover:translate-x-2 transition-all">
      <Link
        href={"/products"}
        onClick={() =>
          dispatch(
            setFilters({
              name: "category",
              value: [`${_id},${name}`],
            })
          )
        }
        className="capitalize"
      >
        {name}
      </Link>
    </li>
  );
};

export default ListClient;
