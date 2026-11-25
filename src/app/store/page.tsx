import React from "react";
import StoreClient from "./StoreClient";
import { getPublishedProducts } from "../../lib/products-repository";

export const dynamic = "force-dynamic";

export default async function StorePage() {
  const { products } = await getPublishedProducts();
  return <StoreClient initialProducts={products} />;
}
