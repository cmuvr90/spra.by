import ImageInterface from "./ImageInterface";

export default interface VariantInterface {
  id: string,
  title?: string
  values: {
    option: string,
    value: string,
    title: string
  }[],
  image: ImageInterface
}
