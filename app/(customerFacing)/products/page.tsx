import ProductCard from "@/components/product-card";
import { createClient } from "@/utils/supabase/server";

export default async function Products() {
  const supabase = createClient();
  const { data: products, error } = await supabase.from("products").select();

  return (
    <div className="container my-6 space-y-4">
      <h2>Products</h2>
      <div className="grid sm:grid-cols-1 gap-4">
        {products?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
