import { Button } from "@/components/ui/button";

type TIncreaseDecreaseButtons = {
  itemAmount: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function IncreaseDecreaseButtons({
  itemAmount,
  onIncrease,
  onDecrease,
}: TIncreaseDecreaseButtons) {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={onDecrease}
      >
        -
      </Button>
      <h3>{itemAmount}</h3>
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={onIncrease}
      >
        +
      </Button>
    </div>
  );
}
