import { createClient } from "@/utils/supabase/server";
import { getProducts } from "../cart/action";

export default async function MyOrders() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data || error) {
    return <h1>No user found</h1>;
  }
  const orders = await getOrders(data.user.id);
  const ordersWithProducts = await Promise.all(
    orders!.map(async (order) => {
      const detailedProducts = await Promise.all(
        order.products.map((product: any) => getProducts(product.id))
      );
      return { ...order, detailedProducts };
    })
  );

  ordersWithProducts.map((order) =>
    order.detailedProducts.map((product) => console.log(product.id))
  );

  return (
    <div>
      {!ordersWithProducts || ordersWithProducts.length === 0 ? (
        <p>No orders found</p>
      ) : (
        ordersWithProducts.map((order) => (
          <div key={order.id} className="order">
            <h2>Order ID: {order.id}</h2>
            <h3>Products:</h3>
            {order.detailedProducts && order.detailedProducts.length > 0 ? (
              <ul>
                {order.detailedProducts.flat().map((product: any) => (
                  <li key={product.id}>
                    <strong>{product.name}</strong> - {product.quantity} pcs
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products found in this order</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

async function getOrders(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .select()
    .eq("user_id", id);
  if (error) {
    console.log(error);
    return null;
  }
  return data.map((order) => ({
    ...order,
    products: Array.isArray(order.products)
      ? order.products
      : JSON.parse(order.products),
  }));
}

function OrderThumbnail({
  thumbnail,
  description,
}: {
  thumbnail: string;
  description: string;
}) {
  return (
    <div>
      <img src={thumbnail} alt={description} />
    </div>
  );
}
