import { useState, useCallback, useEffect } from 'react';
import { ImageGallery } from './components/ImageGallery';
import { ProductDetails } from './components/ProductDetails';
import { CartDrawer } from './components/CartDrawer';
import { productData } from './data';
import { CartItem, ColorOption } from './types';

export default function App() {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(productData.colors[0]);
  const [activeImageId, setActiveImageId] = useState<string>(productData.colors[0].imageId);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleColorSelect = useCallback((color: ColorOption) => {
    setSelectedColor(color);
    setActiveImageId(color.imageId);
  }, []);

  const handleThumbnailClick = useCallback((imageId: string) => {
    // Determine which color matches the image thumbnail
    const matchedColor = productData.colors.find(c => c.imageId === imageId);
    if (matchedColor) {
      setSelectedColor(matchedColor);
    }
    setActiveImageId(imageId);
  }, []);

  const handleAddToCart = useCallback(() => {
    setCartItems((prev) => {
      const existing = prev.findIndex((item) => item.color.id === selectedColor.id);
      if (existing >= 0) {
        const newItems = [...prev];
        newItems[existing].quantity += quantity;
        return newItems;
      }
      return [...prev, { product: productData, color: selectedColor, quantity }];
    });
    setIsCartOpen(true);
    setQuantity(1);
  }, [selectedColor, quantity]);

  const removeCartItem = useCallback((index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white font-sans text-black relative select-none">
      {/* Minimalist Navigation */}
      <nav 
        className={`fixed top-0 w-full h-20 px-6 md:px-12 flex items-center justify-between border-b border-zinc-100 bg-white z-40 transition-all duration-300`}
      >
        <div className="text-2xl tracking-[0.5em] font-light italic uppercase text-black select-none">
          AURA
        </div>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-none hover:bg-zinc-800 transition-colors"
          aria-label="Open cart"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Bag</span>
          <span className="opacity-60 text-xs font-mono">{totalCartItems}</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen pt-32 pb-12 max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-0 font-sans text-black">
        {/* Left: Gallery */}
        <div className="w-full md:w-1/2 md:pr-12 h-full flex flex-col justify-center relative">
          <ImageGallery
            activeImageId={activeImageId}
            onImageChange={setActiveImageId}
            onColorThumbnailClick={handleThumbnailClick}
          />
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 md:pl-12 flex flex-col justify-center h-full relative">
          <ProductDetails
            product={productData}
            selectedColor={selectedColor}
            quantity={quantity}
            onColorSelect={handleColorSelect}
            onQuantityChange={setQuantity}
            onAddToCart={handleAddToCart}
          />
        </div>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeCartItem}
      />
    </div>
  );
}
