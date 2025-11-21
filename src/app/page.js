import BookingForm from "@/components/shared/BookingForm";
import Footer from "@/components/shared/Footer";
import Gallery from "@/components/shared/Gallery";
import Header from "@/components/shared/Header";
import Hero from "@/components/shared/Hero";
import Services from "@/components/shared/Services";

export default function Home() {
  return (
    <div>
      <Header />
       <Header />
      <Hero />
      <Services />
      <Gallery />
      <BookingForm />
      <Footer />
    </div>
  );
}
