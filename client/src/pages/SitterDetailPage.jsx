import { ImageProvider } from "../contexts/StarRatingContext";
import SitterDetail from "../components/sittedetail/SitterDetail";
import Footer from "../components/systemdesign/Footer";
import NavBar from "../components/systemdesign/Navbar";

function SitterDetailPage() {
  return (
    <ImageProvider>
      <div>
        <>
          <NavBar />
          <SitterDetail />
          <Footer />
        </>
      </div>
    </ImageProvider>
  );
}

export default SitterDetailPage;
