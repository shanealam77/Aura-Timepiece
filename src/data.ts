import { Product } from './types';

export const productImages: Record<string, string> = {
  black: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
  silver: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1200&auto=format&fit=crop',
  rose: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1200&auto=format&fit=crop',
};

export const productData: Product = {
  id: 'aura-series-1',
  name: 'Aura Horizon',
  price: 649,
  description: 'A masterpiece of minimalist design and modern technology. The Aura Horizon features an edge-to-edge sapphire glass display, titanium casing, and a precision-engineered biometric sensor suite to seamlessly integrate into your daily rhythm without the visual noise.',
  colors: [
    { id: 'matte-black', name: 'Matte Black', hex: '#222222', imageId: 'black' },
    { id: 'brushed-silver', name: 'Brushed Silver', hex: '#e2e4e6', imageId: 'silver' },
    { id: 'rose-gold', name: 'Rose Gold', hex: '#d6a89c', imageId: 'rose' },
  ],
};
