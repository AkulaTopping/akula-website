import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order & Store",
  description: "Order Akula Topping products — explore available flavours and contact us for supply and pricing.",
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
