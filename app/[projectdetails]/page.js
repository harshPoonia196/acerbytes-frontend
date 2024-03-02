import PropertyDetails from "./DetailsProperty";
import {notFound} from 'next/navigation'


export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const projectdetails = params.projectdetails
  const parts = projectdetails.split('-');
  const getId = parts[parts.length - 1];
  // fetch data
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const product = await fetch(`${baseUrl}/activeAd/${getId}`).then((res) => res.json())
  if(product.status !== 200){
    notFound()
  }
  return {
    title: product?.data?.[0]?.title ?? "",
    description: projectdetails ?? ""
  }
}

const Page = ({ params }) => {
  return (
    <PropertyDetails params={params} />
  );
};

export default Page;
