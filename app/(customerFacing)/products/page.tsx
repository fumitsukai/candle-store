import ProductCard from "@/components/product-card";
import { createClient } from "@/utils/supabase/server";

export default async function Products() {
  const supabase = createClient();
  const { data: products, error } = await supabase.from("products").select();

  return (
    <div className="px-2 my-6 space-y-4">
      <h2 className="text-xl font-semibold text-center">Products</h2>
      <div className="grid grid-cols-2 gap-2">
        {products?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
