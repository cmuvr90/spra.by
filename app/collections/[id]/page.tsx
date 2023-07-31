import ProductCart from '@/components/ProductCart';
import defaultData from '../../../storage/default.json';

export default function Collection() {
  return (
    <main>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {defaultData.products.map((product, index) => {
          return <ProductCart product={product} key={index} />;
        })}
      </div>
    </main>
  );
}
