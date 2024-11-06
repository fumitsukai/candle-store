import ProductCard from "@/components/product-card";
import { ProductProps } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

export default async function Orders() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data) {
    return <h1>Error fetching user</h1>;
  }

  const orders = await getOrder(data.user.id);
  if (!orders || orders.length === 0) {
    return <h1>No orders found</h1>;
  }

  // Fetch products for each order individually to avoid duplication
  const ordersWithProducts = await Promise.all(
    orders.map(async (order) => {
      const productIds = JSON.parse(order.products).map(
        (product: ProductProps) => product.id
      );
      const products = await getProductsByIds(productIds);
      return { ...order, products };
    })
  );

  return (
    <div>
      {ordersWithProducts.map((order) => (
        <div key={order.id}>
          <h1>Order ID: {order.id}</h1>
          <div>
            {order.products.map((product: ProductProps) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

async function getOrder(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .select()
    .eq("user_id", id);
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

async function getProductsByIds(ids: number[]) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select()
    .in("id", ids);
  if (error) {
    console.log(error);
    return [];
  }
  return data;
}
