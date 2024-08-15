import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ClientList from './Pages/ClientList';
import AddClient from './Pages/AddClient';
import Admin from './Pages/Admin';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlansAndProducts from './Pages/PlansAndProducts';
import AddPlans from './Pages/AddPlans';
import Billing from './Pages/Billing';
import AddBill from './Pages/AddBill';
import AddUser from "./Pages/AddUser";
import SuccessfullAccount from './Pages/SuccessfullAccount';
import SuccessfullPlan from './Pages/SuccessfullPlan';
import RecoveryPassword from './Pages/RecoveryPassword';
import SuccessFullRecoveryEmailSend from './Pages/SuccessFullRecoveryEmailSend';
import ChangePassword from './Pages/ChangePassword';
import Client from './Pages/Client';
import AddProducts from './Pages/AddProducts';
import SuccessfullProduct from './Pages/SuccessfullProduct';
import AddSurcharges from './Pages/AddSurcharges';
import SuccessfullSurcharge from './Pages/SuccessfullSurcharge';
import SuccessfullClient from './Pages/SuccessfullClient';
import SuccessfullClientEdit from './Pages/SuccessfullClientEdit';
import Plan from './Pages/Plan';
import { PlanGeneralData } from './Components/PlanGeneralData';

<link href="./output.css" rel="stylesheet"/>


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  

  <Provider store={store}>
    <BrowserRouter>
    < Routes>
        <Route path="/" element={<App />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/SuccessfullAccount" element={<SuccessfullAccount />} />
        <Route path="/SuccessfullPlan" element={<SuccessfullPlan />} />
        <Route path="/SuccessfullProduct" element={<SuccessfullProduct />} />
        <Route path="/SuccessfullSurcharge" element={<SuccessfullSurcharge />} />
        <Route path="/SuccessfullClient" element={<SuccessfullClient />} />
        <Route path="/SuccessfullClientEdit" element={<SuccessfullClientEdit />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="RecoveryPassword" element={<RecoveryPassword />} />
        <Route path="SuccessFullRecoveryEmailSend" element={<SuccessFullRecoveryEmailSend />} />
        <Route path="Admin" element={<Admin /> } > 
          <Route path="ClientList" element={<ClientList />} />
          <Route path="Client" element={<Client />}/>
          <Route path="Plan" element={<Plan />}>
            <Route path="Plan/PlanGeneralData" element={<PlanGeneralData />}/>
          </Route>
          <Route path="/Admin/AddClient" element={<AddClient />} />
          <Route path="/Admin/Billing" element={<Billing />}>
            <Route path="/Admin/Billing/AddBill" element={<AddBill />} />
          </Route>
          <Route path="/Admin/PlansAndProducts" element={<PlansAndProducts />}>
            <Route path="/Admin/PlansAndProducts/AddPlans" element={<AddPlans />} />
            <Route path="/Admin/PlansAndProducts/AddProducts" element={<AddProducts />} />
            <Route path="/Admin/PlansAndProducts/AddSurcharges" element={<AddSurcharges />} />
          </Route>

          
        </Route>
        
      </Routes>
    </BrowserRouter>
  </Provider>
);

