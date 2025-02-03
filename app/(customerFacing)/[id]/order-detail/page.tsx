import { createClient } from "@/utils/supabase/server";

export default async function OrderDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const order = await getOrder(id);

  return <h1>{order.id}</h1>;
}

async function getOrder(order_id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .select()
    .eq("id", order_id)
    .single();
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}
