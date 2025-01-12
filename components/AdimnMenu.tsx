import Link from "next/link";

function AdimnMenu() {
  const items = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Users", href: "/admin/users" },
    { label: "Products", href: "/admin/products" },
    { label: "Orders", href: "/admin/orders" },
  ];

  return (
    <div className="bg-slate-700 text-white rounded-md">
      <ul className="flex justify-center items-center py-3 gap-x-5">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="py-1 px-2 hover:bg-slate-500 transition-all rounded-md"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdimnMenu;
