import { ProductInfo } from "@/components/product-info";
import { createClient } from "@/utils/supabase/server";

export default async function ViewProduct({
  params: { id, name },
}: {
  params: { id: number; name: string };
}) {
  const supabase = createClient();
  const { data: product, error } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .single();
  return <ProductInfo {...product!} key={id} />;
}
