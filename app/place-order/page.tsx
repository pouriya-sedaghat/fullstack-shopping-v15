import CheckOutWizard from "@/components/CheckOutWizard";

import PlaceOrderDetails from "@/components/PlaceOrderDetails";

import Auth from "@/components/Auth";

import { Metadata } from "next";

async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Place Order",
  };
}

function PlaceOrder() {
  return (
    <Auth>
      <div className="grid grid-rows-[auto,1fr] gap-y-4">
        <CheckOutWizard activeStep={3} />
        <PlaceOrderDetails />
      </div>
    </Auth>
  );
}

export default PlaceOrder;
