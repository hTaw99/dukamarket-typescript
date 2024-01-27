import CartClient from "@/components/CartClient";

const Cart =  () => {
  return (
    <div className="container flex flex-col h-screen lg:grid lg:grid-cols-[3fr_1fr] gap-4">
      <CartClient />
    </div>
  );
};

export default Cart;
