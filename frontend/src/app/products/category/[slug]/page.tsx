import ProductList from "@/components/product/product-list";
import { use } from "react";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export default function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = use(params);
  return (
    <main className="max-w-[1150px] mx-auto">
      <ProductList category={slug}/>
    </main>
  );
}
