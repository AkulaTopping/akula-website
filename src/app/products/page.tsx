import React, { Suspense } from "react";
import Link from "next/link";
import ProductsClientView from "./ProductsClientView";
import { getPublishedProducts } from "../../lib/products-repository";
import type { ProductItem } from "../../utils/referenceData";

export const dynamic = "force-dynamic";

function ProductsFallback({ products }: { products: ProductItem[] }) {
  return (
    <main className="section" id="products" style={{ minHeight: "80vh", paddingTop: "60px" }}>
      <div className="section-head">
        <div>
          <span className="eyebrow" dir="ltr">OUR COLLECTION</span>
          <h2>All Akula Products & Flavours</h2>
        </div>
      </div>
      <div className="flavors" id="catalog">
        {products.map((p) => (
          <article className="flavor has-image" key={p.slug}>
            <Link href={`/products/${p.slug}`} style={{ display: "block", color: "inherit", textDecoration: "none" }}>
              <img
                className="product-image"
                src={p.image || `/assets/${p.slug}.jpg`}
                loading="lazy"
                decoding="async"
                alt={`Akula ${p.name}`}
              />
              <span>{p.tag}</span>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
            </Link>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "10px" }}>
              <Link
                href={`/products/${p.slug}`}
                style={{
                  fontSize: "12px",
                  color: "var(--green)",
                  borderBottom: "1px solid #d1d8cf",
                  padding: "5px",
                  fontWeight: 600,
                }}
              >
                Full details →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default async function ProductsPage() {
  const { products } = await getPublishedProducts();

  return (
    <Suspense fallback={<ProductsFallback products={products} />}>
      <ProductsClientView initialProducts={products} />
    </Suspense>
  );
}
