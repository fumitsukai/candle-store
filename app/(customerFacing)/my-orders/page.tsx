import { createClient } from "@/utils/supabase/server";
import { getProducts } from "../cart/action";
import { OrderProps, ProductProps } from "@/lib/types";
import Link from "next/link";
import Header from "@/components/header";
import { ArrowLeft } from "lucide-react";

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

  return (
    <div className="h-dvh bg-slate-100">
      <div className="flex items-center justify-between p-1 bg-white border-y">
        <Link href="/view-profile">
          <ArrowLeft />
        </Link>
        <Header name="MY ORDERS" />
        <div className="w-5"></div>
      </div>
      <div className="text-sm p-1">{ordersWithProducts.length} orders</div>
      <div className="space-y-2">
        {!ordersWithProducts || ordersWithProducts.length === 0 ? (
          <p>No orders found</p>
        ) : (
          ordersWithProducts.map((order, index) => (
            <OrderCard key={index} {...order} />
          ))
        )}
      </div>
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

function OrderCard(props: OrderProps) {
  var date = new Date(props.created_at);
  return (
    <>
      <Link href={`${props.id}/order-detail`}>
        <div className="space-y-2 bg-white p-1">
          <div>Delivery Status: {props.status}</div>
          <div className="text-sm">Track Parcel</div>
          <div className="flex gap-1">
            {props.detailedProducts.flat().map((product: ProductProps) => (
              <div key={product.id} className="w-24 h-24 bg-slate-600">
                <img src={product.thumbnail} alt={product.name} />
              </div>
            ))}
          </div>
          <div className="text-sm font-thin space-y-1">
            <div>Order Id: {props.id}</div>
            <div>Created At: {date.toLocaleDateString()}</div>
          </div>
        </div>
      </Link>
    </>
  );
}
