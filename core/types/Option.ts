export type Option = {
  id: string;
  name: string;
  type: string; //@todo fix
  key: string; //@todo remove
  title: string;
  description?: string;
  values: string[];
  createdAt: string;
  updatedAt: string;
};
