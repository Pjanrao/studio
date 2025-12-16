import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Truck, ShieldCheck } from 'lucide-react';
import { products, categories } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCard } from '@/components/product-card';

export default function HomePage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-banner');
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us-image');

  const featuredProducts = products.filter((p) => p.featured);
  const featuredCategories = categories.filter((c) => c.featured);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Vast green field"
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-20 flex h-full flex-col items-center justify-center text-center">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
            Riva Agro Exports
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Delivering the finest quality agricultural products from our farms to the world.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/products">Explore Our Products</Link>
          </Button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-center font-headline text-3xl font-bold tracking-tight">
            Featured Categories
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {featuredCategories.map((category) => {
              const categoryImage = PlaceHolderImages.find(
                (img) => img.id === category.image
              );
              return (
                <Link key={category.id} href={`/products?category=${category.slug}`} className="group">
                  <Card className="overflow-hidden transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                    <div className="relative h-40 w-full">
                      <Image
                        src={categoryImage?.imageUrl || ''}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        data-ai-hint={categoryImage?.imageHint}
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-center font-semibold">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <h2 className="text-center font-headline text-3xl font-bold tracking-tight">
            Our Featured Products
          </h2>
          <Carousel
            opts={{ align: 'start', loop: true }}
            className="mt-8"
          >
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-background">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                {aboutImage && <Image src={aboutImage.imageUrl} alt="About Riva Agro Exports" fill className="object-cover" data-ai-hint={aboutImage.imageHint} />}
            </div>
            <div>
                <h2 className="font-headline text-3xl font-bold tracking-tight">About Riva Agro Exports</h2>
                <p className="mt-4 text-muted-foreground">
                    At Riva Agro Exports, we are dedicated to bridging the gap between local farmers and the global market. With years of experience in the agriculture sector, we specialize in sourcing and exporting a wide range of high-quality agro products. Our commitment to quality, reliability, and sustainable practices has made us a trusted name in the industry.
                </p>
                <Button asChild className="mt-6">
                    <Link href="/about">Learn More</Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <h2 className="text-center font-headline text-3xl font-bold tracking-tight">
            Why Choose Us?
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardHeader className="items-center">
                <Leaf className="h-10 w-10 text-primary" />
                <CardTitle className="font-headline">Premium Quality</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                We source directly from trusted farms to ensure our products meet the highest standards of quality and freshness.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="items-center">
                <Truck className="h-10 w-10 text-primary" />
                <CardTitle className="font-headline">Global Logistics</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Our efficient supply chain ensures timely and safe delivery of products to any corner of the world.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="items-center">
                <ShieldCheck className="h-10 w-10 text-primary" />
                <CardTitle className="font-headline">Certified Exports</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                We adhere to all international export standards and certifications, guaranteeing a hassle-free process for our clients.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
