function CheckOutWizard({ activeStep = 0 }: { activeStep: number }) {
  const titles = ["User Login", "Shipping", "Payment Method", "Place Order"];

  return (
    <div>
      <ul className="flex text-center rounded-md overflow-hidden">
        {titles.map((item, index) => (
          <li
            key={index.toString()}
            className={`${
              activeStep >= index
                ? "bg-slate-600 text-white border-b-[0.19rem] border-slate-800 hover:bg-slate-500 transition-all"
                : "bg-slate-300 text-white border-slate-600"
            } grow py-5`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CheckOutWizard;
