import CheckOutWizard from "@/components/CheckOutWizard";

import ShippingForm from "@/components/ShippingForm";

import Auth from "@/components/Auth";

import { Metadata } from "next";

async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Shipping",
  };
}

function Shipping() {
  return (
    <Auth>
      <div className="grid grid-rows-[auto,1fr] h-full">
        <CheckOutWizard activeStep={1} />
        <ShippingForm />
      </div>
    </Auth>
  );
}

export default Shipping;
