import HeaderExit from "@/components/header_x";
import ProductCard from "@/components/product-card";
import { createClient } from "@/utils/supabase/server";

export default async function Products() {
  const supabase = createClient();
  const { data: products, error } = await supabase.from("products").select();
  if (error) throw error;

  return (
    <div className="space-y-4">
      <HeaderExit name="PRODUCTS" url="/" />
      <div className="grid grid-cols-2 gap-2">
        {products?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
