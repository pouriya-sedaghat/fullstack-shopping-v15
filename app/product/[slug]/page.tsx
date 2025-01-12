type Params = Promise<{ slug: string }>;

import { Metadata } from "next";

// import products from "@/data/products.json";

import service from "@/utils/service";

import { Product } from "@/interface/Product";

import Image from "next/image";

import AddToCart from "@/components/AddToCart";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const slug = (await params).slug;

  const products: Product[] = await service.getProductsHandler();

  const { title }: Product = products.find((item) => item.slug === slug)!;

  return {
    title,
  };
}

async function ProductDetailPage({ params }: { params: Params }) {
  const slug = (await params).slug;

  const products: Product[] = await service.getProductsHandler();

  const product: Product = products.find((item) => item.slug === slug)!;

  return (
    <div className="grid grid-cols-1 justify-items-center gap-y-3">
      <div>
        <Image
          src={product.image}
          alt={product.title}
          width={240}
          height={330}
          priority
        />
      </div>
      <div className="w-1/3">
        <h2 className="text-lg">{product.title}</h2>
        <p className="text-justify my-1">{product.description}</p>
        <p>price: {product.price.toLocaleString()} IRR</p>
        <p className="my-1">category: {product.category}</p>
        <p>count: {product.count}</p>
        <AddToCart product={product} isOptional />
      </div>
    </div>
  );
}

export default ProductDetailPage;
