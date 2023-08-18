import { Option } from './OptionInterface';

export type Category = {
  id: string;
  name: string;
  handle: string;
  title: string;
  description?: string;
  image?: {
    src: string;
  };
  options: Option[];
  createdAt: string;
  updatedAt: string;
};
