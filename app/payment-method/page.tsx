import CheckOutWizard from "@/components/CheckOutWizard";

import PaymentMethodForm from "@/components/PaymentMethodForm";

import Auth from "@/components/Auth";

import { Metadata } from "next";

async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Payment Method",
  };
}

function PaymentMethods() {
  return (
    <Auth>
      <div className="grid grid-rows-[auto,1fr] h-full">
        <CheckOutWizard activeStep={2} />
        <PaymentMethodForm />
      </div>
    </Auth>
  );
}

export default PaymentMethods;
