import { CardPet1 } from "../../components/systemdesign/CardPet";
import Sidebar from "../../components/UserManagement/Sidebar";
import PaymentGateway from "../../components/booking/PaymentGateway";

function PetListPage() {
  return (
    <>
      <Sidebar>
        <CardPet1 />
      </Sidebar>
    </>
  );
}

export default PetListPage;
