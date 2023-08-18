import OptionInterface from "./OptionInterface";
import ImageInterface from "./ImageInterface";
import VariantInterface from "./VariantInterface";

export default interface ProductInterface {
  id: string,
  title: string
  description: string
  price?: string
  discountPrice?: string
  handle: string
  options: OptionInterface[]
  images: ImageInterface[]
  variants: VariantInterface[]
}
