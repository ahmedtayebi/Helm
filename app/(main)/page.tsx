import { Hero } from "@/components/sections/Hero";
import { Programs } from "@/components/sections/Programs";
import { Features } from "@/components/sections/Features";
import { CourseCarousel } from "@/components/sections/CourseCarousel";
import { CompaniesMarquee } from "@/components/sections/CompaniesMarquee";
import { CommunityPreview } from "@/components/sections/CommunityPreview";
import { LibraryPreview } from "@/components/sections/LibraryPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Programs />
      <Features />
      <CourseCarousel />
      <CompaniesMarquee />
      <CommunityPreview />
      <LibraryPreview />
      <FinalCTA />
    </div>
  );
}
