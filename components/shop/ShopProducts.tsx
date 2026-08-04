import { getShopProducts } from "@/components/shop/getShopData";
import ShopProductGrid from "@/components/shop/ShopProductGrid";
import type { ShopSearchParams } from "@/components/shop/shop.types";

type ShopProductsProps = {
  params: ShopSearchParams;
};

export default async function ShopProducts({ params }: ShopProductsProps) {
  const products = await getShopProducts(params);

  return <ShopProductGrid products={products} />;
}
