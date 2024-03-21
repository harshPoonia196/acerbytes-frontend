import React from "react";
import PropertyList from "../PropertyList";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const product = await fetch(`${baseUrl}/category/get-locations`).then((res) => res.json())
  const cityMatch = product.data.find((dataItem) => dataItem.city.toLowerCase() ===  decodeURIComponent(params.location)?.toLowerCase());

  // if(!cityMatch){
  //   notFound()
  // }

}

function page({ params }) {
  return (
  <PropertyList params={params} />
  );
}

export default page;
