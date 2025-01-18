// import products from "@/data/products.json";

import service from "@/utils/service";

import { Product } from "@/interface/Product";

import ProductItem from "@/components/Product";

async function Home() {
  const products: Product[] = await service.getProductsHandler();

  return (
    <div className="grid grid-cols-4 justify-items-center gap-5 w-fit mx-auto">
      {products.map((item) => (
        <ProductItem product={item} key={item._id} />
      ))}
    </div>
  );
}

export default Home;
