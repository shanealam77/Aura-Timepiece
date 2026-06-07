import { motion, AnimatePresence } from 'motion/react';
import { productImages } from '../data';

interface ImageGalleryProps {
  activeImageId: string;
  onImageChange: (imageId: string) => void;
  onColorThumbnailClick: (imageId: string) => void;
}

export function ImageGallery({ activeImageId, onImageChange, onColorThumbnailClick }: ImageGalleryProps) {
  const thumbnailIds = ['black', 'silver', 'rose'];

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      {/* Main Image */}
      <div className="relative aspect-square w-full rounded-none overflow-hidden bg-zinc-50 border border-zinc-100 flex items-center justify-center transition-all duration-700">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImageId}
            src={productImages[activeImageId]}
            alt={`Watch variant ${activeImageId}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4">
        {thumbnailIds.map((id) => (
          <button
            key={id}
            onClick={() => onColorThumbnailClick(id)}
            onMouseEnter={() => onImageChange(id)}
            className={`relative w-20 h-20 sm:w-24 sm:h-24 p-1 bg-white transition-all duration-300 ${
              activeImageId === id ? 'border-2 border-black' : 'border border-zinc-200 hover:border-black'
            }`}
          >
            <img
              src={productImages[id]}
              alt={`Thumbnail ${id}`}
              className="w-full h-full object-cover rounded-none"
            />
            {activeImageId !== id && (
              <div className="absolute inset-0 bg-white/30 backdrop-grayscale-[0.5] transition-opacity hover:opacity-0" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
