import React from "react";
import PropertyDetailsPage from "../PropertyDetailsPage";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const parts = params.id.split("-");
  const paramsId = parts[parts.length - 1];
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const product = await fetch(
    `${baseUrl}/property/getProperty/${paramsId}`
  ).then((res) => res.json());

  if (product.status !== 200) {
    notFound();
  }

  const {
    tagLine: title,
    description,
    image: imageUrl,
  } = product?.data?.marketing;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl, width: 300, height: 200 }],
    },
  };
}

const page = async ({ params }) => {
  return <PropertyDetailsPage params={params} />;
};

export default page;
