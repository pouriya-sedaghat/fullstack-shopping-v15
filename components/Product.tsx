import Link from "next/link";

import Image from "next/image";

import { Product } from "@/interface/Product";

import AddToCart from "./AddToCart";

function ProductItem({ product }: { product: Product }) {
  return (
    <div className="flex flex-col justify-between text-center p-3 ring-1 rounded-lg">
      <Link
        href={`/product/${product.slug}`}
        className="flex items-center grow mb-2.5"
      >
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={285}
          priority
        />
      </Link>
      <div>
        <h2>{product.title}</h2>
        <p className="m-1">{product.price.toLocaleString()} IRR</p>
        <AddToCart product={product} />
      </div>
    </div>
  );
}

export default ProductItem;
