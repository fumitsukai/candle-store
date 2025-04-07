import { createClient } from "@/utils/supabase/server";
import { OrderProps } from "@/lib/types";
import Link from "next/link";
import HeaderBack from "@/components/header_back";

export default async function MyOrders() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data || error) {
    return <h1>No user found</h1>;
  }
  const orders = await getOrders(data.user.id);
  console.log(orders?.map((order) => console.log(order.order_items)));

  return (
    <div className="h-dvh bg-slate-100 border-b">
      <HeaderBack name="My Orders" url="/view-profile" />
      <div className="text-sm p-2">{orders?.length} orders</div>
      <div className="space-y-2">
        {!orders || orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order, index) => <OrderCard key={index} {...order} />)
        )}
      </div>
    </div>
  );
}

async function getOrders(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(*))")
    .eq("user_id", id);
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

function OrderCard(props: OrderProps) {
  var date = new Date(props.created_at);
  return (
    <Link href={`${props.id}/order-detail`} className="block">
      <div className="space-y-2 bg-white p-2">
        <div>
          Delivery Status:{" "}
          <span className={`${props.status === "PENDING" && "text-amber-400"}`}>
            {props.status}
          </span>
        </div>
        <div className="text-sm">Track Parcel</div>
        <div className="flex gap-1">
          {props.order_items.map(({ products }) => (
            <div key={products.id} className="w-24 h-24 bg-slate-600">
              <img src={products.thumbnail} alt={products.name} />
            </div>
          ))}
        </div>
        <div className="text-sm font-thin space-y-1">
          <div>Order Id: {props.id}</div>
          <div>Created At: {date.toLocaleDateString()}</div>
        </div>
      </div>
    </Link>
  );
}
