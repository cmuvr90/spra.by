import { Category } from '@/core/types/Category';

export default interface Collection {
  name: string
  handle: string
  title: string
  description?: string
  image?: {
    src: string
  }
  categories?: Category[]
}
