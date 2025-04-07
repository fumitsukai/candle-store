import { OrderProps, ProductProps } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import HeaderBack from "@/components/header_back";

export default async function OrderDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const order = await getOrder(id);
  const qty = order.order_items.map((item: OrderProps) => {
    return item.quantity;
  });
  var date = new Date(order.created_at);
  return (
    <div className="bg-slate-100 h-dvh space-y-2">
      <HeaderBack name="ORDER DETAILS" url="/my-orders" />
      <div className="p-2 space-y-2 font-light bg-white">
        <div>ORDER ID: {order.id}</div>
        <div>ORDER DATE: {date.toLocaleDateString()}</div>
      </div>
      <div className="p-2 font-semibold">DELIVERY ADDRESS</div>
      <div className="p-2 bg-white">
        <div>{order.delivery_address_line_1}</div>
        <div>{order.delivery_city}</div>
        <div>{order.delivery_postcode}</div>
        <div>{order.delivery_country}</div>
      </div>
      <div className="bg-white space-y-2 p-2">
        <div className="flex justify-between items-center">
          <h2>STATUS: {order.status}</h2>
          <div className="text-xs">
            {qty > 1 ? <p>{qty} items</p> : <p>{qty} item</p>}
          </div>
        </div>
        <ProductCard {...order} />
      </div>
      <div className="p-2 font-semibold">PAYMENT DETAILS</div>
      <div className="bg-white p-2">
        <h2>ORDER TOTAL</h2>
        <div className="flex justify-between items-center font-semibold space-y-2">
          <h3>TOTAL:</h3>
          <p>
            {Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
            }).format(order.total / 100)}
          </p>
        </div>
      </div>
    </div>
  );
}

async function getOrder(order_id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(*))")
    .eq("id", order_id)
    .single();
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

function ProductCard({ order_items }: OrderProps) {
  return (
    <div>
      {order_items.map(({ products, quantity }) => (
        <Card className="flex flex-row" key={products.id}>
          <Image
            src={products.thumbnail}
            alt={products.description}
            width={150}
            height={150}
          />
          <CardHeader className="space-y-2">
            <CardTitle>{products.name}</CardTitle>
            <CardDescription>
              {Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(products.price / 100)}
              <p>
                QTY: <span>{quantity}</span>
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
