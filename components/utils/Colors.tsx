import { TGetProductsReturn } from "@/types/products";

export default function Colors({
  colors,
  colorChoosed,
  setColorChoosed,
}: {
  colors: TGetProductsReturn["products"][number]["colors"];
  colorChoosed: string;
  setColorChoosed: (color: { _id: string; name: string }) => void;
}) {
  return (
    <div>
      <h1 className="mb-1">Colors</h1>
      <div className="flex ">
        {colors?.map((color) => (
          <div
            key={color._id}
            style={{
              border:
                colorChoosed === color.name
                  ? `solid 2px ${color.name}`
                  : "none",
            }}
            className={`p-1 rounded-lg `}
          >
            <div
              onClick={() => setColorChoosed(color)}
              style={{
                backgroundColor: color.name,
              }}
              className={`cursor-pointer w-6 h-6 border-red-500 rounded-md`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
