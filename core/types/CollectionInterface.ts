import CategoryInterface from "./CategoryInterface";

export default interface CollectionInterface {
  name: string
  handle: string
  title: string
  description?: string
  image?: {
    src: string
  }
  categories?: CategoryInterface[]
}
