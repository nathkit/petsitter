import BookingPage from "./BookingPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import RegisterPage from "./RegisterPage";
import SearchList from "./SearchList";
import SitterDetailPage from "./SitterDetailPage";
import Booking4 from "../components/booking/Booking4";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/booking/confirmation" element={<Booking4 />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<SearchList />} />
      <Route path="/sitter" element={<SitterDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

    // <>
    //   {/* <BookingPage /> */}
    //   {/* <HomePage />
    //   {/* <BookingPage />
    //   <HomePage />
    //   <LoginPage />
    //   <NotFoundPage />
    //   <RegisterPage /> */}
    //   {/* <SearchList />
    //   <SitterDetailPage /> */}
    //   {/* <SitterDetailPage /> */}
    // </>
  );
}

export default AuthenticatedApp;
