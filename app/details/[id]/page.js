import React from "react";
import PropertyDetailsPage from "../PropertyDetailsPage";
import { notFound } from "next/navigation";
import Head from "next/head";

export async function generateMetadata({ params }) {
  // read route params
  const parts = params.id.split("-");
  const paramsId = parts[parts.length - 1];
  // fetch data
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const product = await fetch(
    `${baseUrl}/property/getProperty/${paramsId}`
  ).then((res) => res.json());

  if (product.status !== 200) {
    notFound();
  }
  const title = product?.data?.marketing?.tagLine ?? ""
  const description = product?.data?.marketing?.description ?? ""
  const imageUrl = product?.data?.marketing?.image ?? "default-image-url.jpg"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl, width: 500, height: 500}]
    }
  };
}

const page = async ({ params }) => {
  return (
    <>
      <PropertyDetailsPage params={params} />
    </>
  );
};

export default page;
