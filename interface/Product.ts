export interface Product {
  _id?: string;
  slug: string;
  title: string;
  price: number;
  description: string;
  category: string;
  count: number;
  image: string;
  quantity?: number;
  subtotal?: number;
}
