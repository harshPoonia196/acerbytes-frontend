import React from "react";
import PropertyList from "./PropertyList";
import { getToken } from "utills/utills";

function page({ params }) {
  return <PropertyList params={params} />;
}

export default page;
