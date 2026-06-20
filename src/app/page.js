import NavBar from "@/Components/shared/NavBar.jsx";
import Logo from "../Components/Logo.jsx";
import Footer from "@/Components/shared/Footer.jsx";
import Banner from "@/Components/Banner.jsx";
import RegisterToastTrigger from "@/Components/RegisterToastTrigger.jsx";

// Next.js page routes automatically get searchParams as server props
export default async function Home({ searchParams }) {
  const params = await searchParams;
  // Check if the URL has ?registered=true
  const showWelcomeToast = params.registered === "true";

  return (
    <div>
      {/* If registered=true, inject the tiny client component to fire the toast */}
      {showWelcomeToast && <RegisterToastTrigger />}
      
      <Banner />
    </div>
  );
}