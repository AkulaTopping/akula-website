import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description: "Articles, ideas and coffee trends from the Akula Topping journal — tips for cafés, baristas and dessert makers.",
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
