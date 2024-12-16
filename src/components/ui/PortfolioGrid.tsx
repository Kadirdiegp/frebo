'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Category {
  title: string;
  path: string;
  type: string;
  images: string[];
}

interface PortfolioGridProps {
  categories: Category[];
}

export default function PortfolioGrid({ categories }: PortfolioGridProps) {
  // Gruppiere Kategorien nach Typ
  const mxCategories = categories.filter(cat => cat.type === 'mx');
  const productionCategories = categories.filter(cat => cat.type === 'production');
  const portraitCategories = categories.filter(cat => cat.type === 'portrait');

  const renderColumn = (categories: Category[], columnIndex: number) => (
    <div className="flex flex-col gap-4" key={`column-${columnIndex}`}>
      {categories.map((category, index) => {
        // Handle image path
        const imagePath = category.type === 'portrait' 
          ? category.images[0].replace('pör', 'por')
          : category.images[0];

        return (
          <Link href={category.path} key={category.path}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (columnIndex * categories.length + index) * 0.1 }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={imagePath}
                alt={category.title}
                fill
                sizes="(max-width: 768px) 33vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white text-sm md:text-lg font-medium text-center px-2">{category.title}</h3>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-6 px-2 md:px-8 max-w-[1400px] mx-auto">
      {renderColumn(mxCategories, 0)}
      {renderColumn(productionCategories, 1)}
      {renderColumn(portraitCategories, 2)}
    </div>
  );
}
