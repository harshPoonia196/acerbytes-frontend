import React from "react";
import PropertyDetailsPage from "../PropertyDetailsPage";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  // read route params
  const parts = params.id.split('-');
  const paramsId = parts[parts.length - 1];
  // fetch data
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const product = await fetch(`${baseUrl}/property/getProperty/${paramsId}`).then((res) => res.json())
  if(product.status !== 200){
    notFound()
  }return {
    title: product?.data?.marketing?.tagLine ?? "",
    description: product?.data?.marketing?.description ?? ""
  }
}

function page({ params }) {
  return( 
    <PropertyDetailsPage params={params} />
  );
}

export default page;
