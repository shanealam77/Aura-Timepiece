export type ColorOption = {
  id: string;
  name: string;
  hex: string;
  imageId: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  colors: ColorOption[];
};

export type CartItem = {
  product: Product;
  color: ColorOption;
  quantity: number;
};
