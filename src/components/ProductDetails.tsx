import { Product, ColorOption } from '../types';

interface ProductDetailsProps {
  product: Product;
  selectedColor: ColorOption;
  quantity: number;
  onColorSelect: (color: ColorOption) => void;
  onQuantityChange: (q: number) => void;
  onAddToCart: () => void;
}

export function ProductDetails({
  product,
  selectedColor,
  quantity,
  onColorSelect,
  onQuantityChange,
  onAddToCart,
}: ProductDetailsProps) {
  return (
    <div className="flex flex-col justify-center h-full max-w-md mx-auto md:mx-0 py-8 md:py-0 w-full text-black">
      <div className="mb-3 text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-bold">
        New Collection • Limited Release
      </div>
      <h1 className="text-5xl md:text-7xl font-serif italic mb-8 leading-[1.1]">
        {product.name}
      </h1>
      
      <div className="mb-10">
        <span className="text-3xl md:text-4xl font-light tracking-tight">
          ${product.price}.00
        </span>
      </div>

      <p className="text-zinc-500 leading-relaxed mb-10 text-sm max-w-sm">
        {product.description}
      </p>

      {/* Color Selection */}
      <div className="mb-10">
        <div className="text-[10px] uppercase tracking-[0.3em] mb-4 font-bold text-zinc-800">
          Finish: {selectedColor.name}
        </div>
        <div className="flex gap-5">
          {product.colors.map((color) => (
            <button
              key={color.id}
              onClick={() => onColorSelect(color)}
              aria-label={`Select ${color.name} finish`}
              className={`w-6 h-6 rounded-full ring-2 ring-offset-4 transition-all outline-none ${
                selectedColor.id === color.id
                  ? 'ring-black'
                  : 'ring-transparent hover:ring-zinc-300'
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4 items-center mb-10 w-full">
        {/* Quantity Counter */}
        <div className="flex border border-black rounded-none h-14">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="w-14 flex items-center justify-center hover:bg-zinc-50 text-black transition-colors"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
          >
            <span className="text-lg">-</span>
          </button>
          <div className="w-14 flex items-center justify-center border-x border-black font-medium text-black">
            {quantity}
          </div>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="w-14 flex items-center justify-center hover:bg-zinc-50 text-black transition-colors"
            aria-label="Increase quantity"
          >
            <span className="text-lg">+</span>
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          className="flex-1 h-14 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-800 transition-colors rounded-none"
        >
          Add to Cart
        </button>
      </div>
      
      <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row gap-4 sm:gap-12 justify-between text-[9px] uppercase tracking-[0.4em] text-zinc-400">
        <div className="flex flex-col gap-4">
          <span>Global Shipping</span>
          <span>Intl Warranty</span>
          <span>30 Days Return</span>
        </div>
        <div className="flex flex-col gap-4 sm:text-right">
          <span className="text-zinc-600 font-bold">2-3 Bus. Days</span>
          <span className="text-zinc-600 font-bold">2 Years Inc.</span>
          <span className="text-zinc-600 font-bold">Policy Applied</span>
        </div>
      </div>
    </div>
  );
}
