import Hero from "@/components/hero";
import ProductCard from "@/components/product-card";
import { ProductProps } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

async function getNewIn() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select()
    .order("created_at")
    .limit(6);
  if (error) console.log("Error fetching data", error);
  return data;
}

async function getBestsellers() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select()
    .order("qty_sold")
    .limit(10);
  if (error) {
    console.log(error);
  }
  return data;
}

export default async function Home() {
  return (
    <>
      <Hero />
      <div>
        <ProductGrid productFetcher={getNewIn} title="New In" />
      </div>
      <div>
        <ProductGrid productFetcher={getBestsellers} title="Bestsellers" />
      </div>
    </>
  );
}

type ProductGridProps = {
  title: string;
  productFetcher: () => Promise<ProductProps[] | null>;
};

async function ProductGrid({ productFetcher, title }: ProductGridProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl">{title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {(await productFetcher())?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
