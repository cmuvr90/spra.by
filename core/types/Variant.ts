import { Image } from './Image';

export type Variant = {
  id: string,
  title?: string
  values: {
    option: string,
    value: string,
    title: string
  }[],
  image: Image
}
