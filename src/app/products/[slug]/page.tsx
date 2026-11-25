import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { flavourProfilesData } from "../../../utils/referenceData";
import { getPublishedProductBySlug } from "../../../lib/products-repository";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { product } = await getPublishedProductBySlug(slug);
  if (!product) {
    return {
      title: "Product Not Found | Akula Topping",
    };
  }

  const profile = product.profile ?? flavourProfilesData[slug];

  return {
    title: product.name,
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
  const { product, related } = await getPublishedProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const profile = product.profile ?? flavourProfilesData[slug];

  return (
    <ProductDetailClient
      product={product}
      profile={profile}
      relatedProducts={related}
    />
  );
}
