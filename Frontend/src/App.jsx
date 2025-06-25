import './App.css'
import Header from "./component/Header.jsx";
import BannerSection from "./component/BannerSection.jsx";
import OtherFeatures from "./component/OtherFeatures.jsx";
import Projects from "./component/Projects.jsx";
import OurClient from "./component/OurClient.jsx";
import Footer from "./component/Footer.jsx";

function App() {

  return (
    <>
        <Header/>
        <BannerSection/>
        <OtherFeatures/>
        <Projects/>
        <OurClient/>
        <Footer/>
    </>
  )
}

export default App
