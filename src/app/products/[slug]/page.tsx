import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  productsData,
  flavourProfilesData,
} from "../../../utils/referenceData";
import ProductDetailClient from "./ProductDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);
  if (!product) {
    return {
      title: "Product Not Found | Akula Topping",
    };
  }

  const profile = flavourProfilesData[slug];

  return {
    title: `${product.name} | Akula Topping`,
    description: profile?.intro || product.desc,
    openGraph: {
      title: `${product.name} | Akula Topping`,
      description: profile?.intro || product.desc,
      images: [
        {
          url: product.image,
          alt: `Akula ${product.name}`,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const profile = flavourProfilesData[slug];
  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      profile={profile}
      relatedProducts={relatedProducts}
    />
  );
}
