import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Memberlogin from './pages/Memberlogin';
import Addoffer from './pages/Addoffer';
import AddReward from './pages/AddReward';
import PartnerDashboard from './pages/PartnerDashboard';
import Partnerlogin from './pages/Partnerlogin';
import RegisterMember from './pages/RegisterMember';
import RegisterPartner from './pages/RegisterPartner';
import Transaction from './pages/Transaction';
import Error404 from './pages/Error404';
import MemberDashboard from './pages/MemberDashboard';
import Reedem from './pages/Reedem';
import MemberTransaction from './pages/MemberTransaction';



function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={ <Partnerlogin />} />
          <Route path="/member-login" element={ <Memberlogin />} />
          <Route path="/add-offer" element={ <Addoffer />} />
          <Route path="/add-reward" element={ <AddReward />} />
          <Route path="/partner-dashboard" element={ <PartnerDashboard />} />
          <Route path="/member-dashboard" element={ <MemberDashboard />} />
          <Route path="/partner-login" element={ <Partnerlogin />} />
          <Route path="/register-member" element={ <RegisterMember />} />
          <Route path="/register-partner" element={ <RegisterPartner />} />
          <Route path="/transaction" element={ <Transaction />} />
          <Route path="/reedem" element={ <Reedem />} />
          <Route path="/member-transaction" element={ <MemberTransaction />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    );
  }
  
  export default App;
  