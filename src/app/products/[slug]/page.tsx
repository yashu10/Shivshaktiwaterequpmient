import React from "react";
import { Metadata } from "next";
import productsData from "../../../data/products.json";
import { ProductDetailClient } from "../../../components/ProductDetailClient";
import { notFound } from "next/navigation";

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  return productsData.map((p) => ({
    slug: p.filename.replace(".html", ""),
  }));
}

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const resolvedParams = await props.params;
  const product = productsData.find(
    (p) => p.filename.replace(".html", "") === resolvedParams.slug
  );

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.seoTitle} | SHIV SHAKTI WATER EQUIPMENT PVT. LTD.`,
    description: product.seoDesc,
    alternates: {
      canonical: `https://www.shivshaktiengineering.com/products/${resolvedParams.slug}`,
    },
    openGraph: {
      type: "article",
      title: product.seoTitle,
      description: product.seoDesc,
      images: [
        {
          url: `https://www.shivshaktiengineering.com/assets/images/${product.image}`,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage(props: {
  params: Promise<Params>;
}) {
  const resolvedParams = await props.params;
  const product = productsData.find(
    (p) => p.filename.replace(".html", "") === resolvedParams.slug
  );

  if (!product) {
    notFound();
  }

  // Get related products (same category, or just other products, max 4)
  const relatedProducts = productsData
    .filter((p) => p.filename !== product.filename)
    .filter((p) => p.category === product.category || p.category.includes("Filling"))
    .slice(0, 4);

  // If we don't have enough, fill with other products
  if (relatedProducts.length < 4) {
    const filledFilenames = new Set(relatedProducts.map((rp) => rp.filename));
    const extraProducts = productsData
      .filter((p) => p.filename !== product.filename && !filledFilenames.has(p.filename))
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...extraProducts);
  }

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
