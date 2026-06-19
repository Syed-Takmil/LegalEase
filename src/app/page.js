



import NavBar from "@/Components/shared/NavBar.jsx";
import Logo from "../Components/Logo.jsx";
import Footer from "@/Components/shared/Footer.jsx";


export default function Home() {
  return (
   <div className="min-h-full justify-between flex flex-col flex-1 ">
  <NavBar></NavBar>
  <Footer/>
   </div>
  );
}
