import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cart",
  };
}

function CartLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

export default CartLayout;
