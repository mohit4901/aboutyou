import { orderData } from "../data/orderData";

export default function OrderSnapshot() {
  return (
    <div className="mt-6 rounded-xl bg-gray-100 p-4 text-sm">
      <p className="font-medium">{orderData.itemName}</p>
      <p>₹{orderData.amount}</p>
      <p>Delivering to {orderData.city}</p>
    </div>
  );
}
