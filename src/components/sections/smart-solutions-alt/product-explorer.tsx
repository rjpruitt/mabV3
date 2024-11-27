// Add discriminated union type for products
type BaseProduct = {
  id: string;
  name: string;
  image: string;
}

type ProductWithGlass = BaseProduct & {
  hasGlassOptions: true;
  glassOptions: {
    id: string;
    name: string;
    image: string;
  }[];
}

type ProductWithoutGlass = BaseProduct & {
  hasGlassOptions: false;
}

type Product = ProductWithGlass | ProductWithoutGlass;

// Example usage:
const products: Product[] = [
  {
    id: '1',
    name: 'Frameless Shower',
    image: '/path/to/image.jpg',
    hasGlassOptions: true,
    glassOptions: [
      { id: 'g1', name: 'Clear Glass', image: '/path/to/glass1.jpg' },
      { id: 'g2', name: 'Frosted Glass', image: '/path/to/glass2.jpg' }
    ]
  },
  {
    id: '2',
    name: 'Shower Base',
    image: '/path/to/base.jpg',
    hasGlassOptions: false
  }
];

// Type guard function
function hasGlassOptions(product: Product): product is ProductWithGlass {
  return product.hasGlassOptions;
} 