import ImageInterface from "./ImageInterface";

export default interface BrandInterface {
  id: string
  user: string
  name: string
  description?: string
  image?: ImageInterface
  categories: string[],
  createdAt: string,
  updatedAt: string,
}
