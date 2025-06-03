import { useMemo } from "react";

export default function useMostOrdered(orders, topN = 5) {
  return useMemo(() => {
    if (!orders || orders.length === 0) return [];
    const count = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const category = item.category || "main";
        const key = `${order.restaurantId}-${category}-${item.itemId}`;
        count[key] = (count[key] || 0) + item.quantity;
      });
    });
    // Skapa en array av [key, count] och sortera
    const sorted = Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN);
    // Returnera som [{restaurantId, category, itemId, count}]
    return sorted.map(([key, cnt]) => {
      const [restaurantId, category, itemId] = key.split("-");
      return { restaurantId, category, itemId: Number(itemId), count: cnt };
    });
  }, [orders, topN]);
}
