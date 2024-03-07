import React from "react";
import PropertyList from "./PropertyList";

function page({ params }) {
  return( 
  <PropertyList params={params} />
  );
}

export default page;
