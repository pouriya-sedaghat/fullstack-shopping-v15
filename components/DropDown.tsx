import Link from "next/link";

function DropDown({
  href,
  children,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

export default DropDown;
