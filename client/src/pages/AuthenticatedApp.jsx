import BookingPage from "./BookingPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import RegisterPage from "./RegisterPage";
import SearchList from "./SearchList";
import SitterDetailPage from "./SitterDetailPage";
import Booking4 from "../components/booking/Booking4";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import ProfliePage from "./UserManagement/ProfliePage";
import PetListPage from "./UserManagement/PetListPage";
import CreatePetPage from "./UserManagement/CreatePetPage";
import BookingHistoryPage from "./UserManagement/BookingHistoryPage";
import UpdatePetPage from "./UserManagement/UpdatePetPage";
function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking/:userId/:sitterId" element={<BookingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<SearchList />} />
      <Route path="/userManagement/:userId" element={<ProfliePage />} />
      {/* หน้ารวมpet */}
      <Route path="/userManagement/:userId/pets" element={<PetListPage />} />
      {/* สร้างpet */}
      <Route
        path="/userManagement/:userId/pets/create"
        element={<CreatePetPage />}
      />
      {/* อัปเดตpetID */}
      <Route
        path="/userManagement/:userId/pets/:petId"
        element={<UpdatePetPage />}
      />
      ``
      <Route
        path="/userManagement/:userId/booking/:bookingId"
        element={<Booking4 />}
      />
      <Route
        path="/userManagement/:userId/booking"
        element={<SitterDetailPage />}
      />
      <Route
        path="/sitterManagement/:sitterId"
        element={<BookingHistoryPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AuthenticatedApp;
