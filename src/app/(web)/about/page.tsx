import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-image');
  return (
    <div className="container py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          About Riva Agro Exports
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Your trusted partner in bridging the gap between fertile farms and the global market.
        </p>
      </div>

      <div className="mt-12 relative aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
        {aboutImage && <Image src={aboutImage.imageUrl} alt="Riva Agro Exports team" fill className="object-cover" data-ai-hint={aboutImage.imageHint} />}
      </div>

      <div className="max-w-4xl mx-auto mt-12 space-y-8">
        <div>
          <h2 className="font-headline text-3xl font-semibold">Our Mission</h2>
          <p className="mt-4 text-muted-foreground">
            Our mission is to empower local farmers by providing them with a global platform to showcase their hard work and quality produce. We are committed to fostering sustainable agricultural practices, ensuring fair trade, and delivering unparalleled value to our clients worldwide. We strive to be a beacon of quality and trust in the agro-export industry.
          </p>
        </div>

        <div>
          <h2 className="font-headline text-3xl font-semibold">Our Story</h2>
          <p className="mt-4 text-muted-foreground">
            Founded with a passion for agriculture and a vision for global trade, Riva Agro Exports started as a small venture with a big dream. Over the years, we have grown into a reputable export house, building strong relationships with farmers and international buyers. Our journey is a testament to our dedication to quality, integrity, and the enduring spirit of farming communities.
          </p>
        </div>

        <div>
          <h2 className="font-headline text-3xl font-semibold">Our Values</h2>
           <ul className="mt-4 space-y-2 text-muted-foreground list-disc list-inside">
              <li><strong>Quality First:</strong> We never compromise on the quality of our products.</li>
              <li><strong>Integrity:</strong> We conduct our business with honesty and transparency.</li>
              <li><strong>Sustainability:</strong> We promote environmentally friendly farming practices.</li>
              <li><strong>Partnership:</strong> We believe in building long-term, mutually beneficial relationships.</li>
              <li><strong>Customer Focus:</strong> We are dedicated to meeting and exceeding our clients' expectations.</li>
            </ul>
        </div>
      </div>
    </div>
  );
}
