import BookingPage from "./BookingPage";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import SearchList from "./SearchList";
import SitterDetailPage from "./SitterDetailPage";
import Booking4 from "../components/booking/Booking4";
import { Routes, Route } from "react-router-dom";
import ProfliePage from "./UserManagement/ProfliePage";
import PetListPage from "./UserManagement/PetListPage";
import CreatePetPage from "./UserManagement/CreatePetPage";
import BookingHistoryPage from "./UserManagement/BookingHistoryPage";
import UpdatePetPage from "./UserManagement/UpdatePetPage";
import PayoutOptionPage from "./SitterManagement/PayOutOptionPage";
import SitterProfilePage from "./SitterManagement/SitterProfilePage";
import SitterBookingDetailPage from "./SitterManagement/SitterBookingDetailPage";
import SitterBookingListPage from "./SitterManagement/SitterBookingListPage";
import LoginPage from "./LoginPage";
import Register from "./RegisterPage";
import ResetPassword from "./ResetPassword";
function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/booking/:userId/:sitterId" element={<BookingPage />} />
      <Route path="/search" element={<SearchList />} />
      <Route path="/userManagement/:userId" element={<ProfliePage />} />
      <Route path="/userManagement/:userId/pets" element={<PetListPage />} />
      <Route
        path="/userManagement/:userId/pets/create"
        element={<CreatePetPage />}
      />
      <Route
        path="/userManagement/:userId/pets/:petId"
        element={<UpdatePetPage />}
      />
      <Route
        path="/userManagement/:userId/booking/:bookingId"
        element={<Booking4 />}
      />
      <Route
        path="/userManagement/:userId/booking"
        element={<BookingHistoryPage />}
      />
      <Route path="/sitterDetail/:sitterId" element={<SitterDetailPage />} />

      {/* sitter management */}
      <Route
        path="/sitterManagement/:sitterId"
        element={<SitterProfilePage />}
      />
      <Route path="/sitterManagement/create" element={<SitterProfilePage />} />
      <Route
        path="/sitterManagement/:sitterId/sitterBookingList"
        element={<SitterBookingListPage />}
      />
      <Route
        path="/sitterManagement/:sitterId/sitterBookingList/:bookingId"
        element={<SitterBookingDetailPage />}
      />
      <Route
        path="/sitterManagement/:sitterId/payoutOption"
        element={<PayoutOptionPage />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AuthenticatedApp;
