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
  const title = product?.data?.[0]?.propertyData?.marketing?.tagLine ?? ""
  const description = product?.data?.[0]?.propertyData?.marketing?.description ?? ""
  const imageUrl = product?.data?.[0]?.propertyData?.marketing?.image ?? "vercel.svg"
  const mainTitle = product?.data[0]?.title ?? ""

  return {
    title : mainTitle,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl, width: 300, height: 200}]
    }
  }
}

const Page = ({ params }) => {
  return (
    <PropertyDetails params={params} />
  );
};

export default Page;
