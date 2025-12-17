"use client";

import Image from 'next/image';
import { useState } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  imageIds: string[];
  productName: string;
}

export function ProductImageGallery({ imageIds, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(imageIds[0]);

  const images = imageIds.map(id => PlaceHolderImages.find(img => img.id === id)).filter(Boolean);

  if (!images.length) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex md:flex-col gap-2">
        {images.map(image => image && (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image.id)}
            className={cn(
              "relative h-16 w-16 rounded-md overflow-hidden ring-2 ring-transparent transition",
              selectedImage === image.id ? "ring-primary" : "hover:ring-primary/50"
            )}
          >
            <Image
              src={image.imageUrl}
              alt={`${productName} thumbnail`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 10vw, 5vw"
              unoptimized
            />
          </button>
        ))}
      </div>
      <div className="flex-1">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md">
          <Image
            src={PlaceHolderImages.find(img => img.id === selectedImage)?.imageUrl || ''}
            alt={productName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 40vw"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
