import { AnnouncementBar } from "@/components/landing/announcement-bar";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { StatsBar } from "@/components/landing/stats-bar";
import { PainPoints } from "@/components/landing/pain-points";
import { Chapters } from "@/components/landing/chapters";
import { Author } from "@/components/landing/author";
import { Testimonials } from "@/components/landing/testimonials";
import { Offer } from "@/components/landing/offer";
import { Guarantee } from "@/components/landing/guarantee";
import { Faq } from "@/components/landing/faq";
import { LeadCapture } from "@/components/landing/lead-capture";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#160d26]">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <StatsBar />
        <PainPoints />
        <Chapters />
        <Author />
        <Testimonials />
        <Offer />
        <Guarantee />
        <Faq />
        <LeadCapture />
      </main>
      <Footer />
    </div>
  );
}
