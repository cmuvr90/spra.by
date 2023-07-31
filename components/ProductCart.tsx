import Image from 'next/image';
import Link from 'next/link';

const ProductCart = ({ product }: Props) => {
  return (
    <div className="flex gap-2 p-2 flex-col">
      <Link href={'/products/cascas6545c6as1c6a516sa'}>
        <div className=" aspect-square bg-white rounded-md">
          <Image
            style={{ aspectRatio: 1, objectFit: 'cover', borderRadius: '0.375rem' }}
            width={500}
            height={500}
            src={product.image}
            alt={product.title}
          />
        </div>
      </Link>
      <div className="flex flex-col">
        <h3 className="text-sm">
          <Link href={'/products/cascas6545c6as1c6a516sa'}> {product.title} </Link>
        </h3>
        <h4 className="text-xs">{product.description}</h4>
        <div className="flex gap-2 items-center">
          <span className="text-xs text-gray-400 line-through">{product.price}</span>
          <span className="text-base font-semibold text-purple-500">{product.discountPrice}</span>
        </div>
      </div>
    </div>
  );
};

type Props = {
  product: {
    image: string;
    title: string;
    description: string;
    price: string;
    discountPrice: string;
    url: string;
  };
};

export default ProductCart;
