import ProductCart from '@/components/ProductCart';
import defaultData from '../storage/default.json';

export default function Home() {
  return (
    <main>
      <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {defaultData.products.map((product, index) => {
          return <ProductCart product={product} key={index} />;
        })}
      </div>
    </main>
  );
}
