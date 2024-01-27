"use client";
import { useAppSelector } from "@/hooks/redux";

import TableItemProduct from "./TableItemProduct";
import { fieldToCompare } from "@/constants/tableFields";

const Table = () => {
  const { productsToCompare } = useAppSelector((state) => state.compare);

  return (
    <div
      className={` ${
        productsToCompare.length === 0 && " aspect-square"
      } rounded-md `}
    >
      <h1 className="capitalize text-2xl font-medium pb-3 mb-3 border-b border-slate-300">
        compare table
      </h1>
      {productsToCompare.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <p className="text-gray-600">No products to compare</p>
        </div>
      ) : (
        <table className=" border-collapse ">
          <tbody>
            {fieldToCompare?.map((field, i) => (
              <tr key={field?.id}>
                <th
                  className={`px-8 py-2 ${
                    field.name == "image" ? "" : " bg-neutral-200 "
                  } capitalize border-b border-slate-300  text-gray-600 font-medium`}
                >
                  {field.name === "image" ? "" : field?.name}
                </th>

                {productsToCompare?.map((product, i) => (
                  <TableItemProduct
                    key={product.sku}
                    field={field}
                    product={product}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
