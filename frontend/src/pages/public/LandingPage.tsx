import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorksSection";
import Footer from "../../components/landing/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8f6ff]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default LandingPage;