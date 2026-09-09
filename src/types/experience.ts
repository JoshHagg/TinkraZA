export interface Experience {
  id: string;
  title: string;
  category: string;
  area: string;
  price: number;
  duration: string;
  tags: string[];
  description: string;
  included: string[];
  provider: string;
  image: string;
  imagePosition?: string;
  featured?: boolean;
}
