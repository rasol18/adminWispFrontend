import ClientList from "./ClientList";
import Header from "../Components/Header";
import LeftSideBar from "../Components/LeftSideBar";
import AddClient from "./AddClient";
import { Routes, Route } from 'react-router-dom';
import PlansAndProducts from "./PlansAndProducts";
import AddPlans from "./AddPlans";
import Billing from "./Billing";
import AddBill from "./AddBill";
import Client from "./Client";
import AddProducts from "./AddProducts";
import AddSurcharges from "./AddSurcharges";
import Plan from "./Plan";
import { PlanGeneralData } from "../Components/PlanGeneralData";

function Admin() {
    return (<div className="flex flex-col h-screen">
        <div>
            <Header></Header>
        </div>  
        <div className="flex flex-row flex-1">
            <LeftSideBar></LeftSideBar>
            <Routes>
                <Route path="" element={<AdminHome />} />
                <Route path="AddClient" element={<AddClient />} />
                <Route path="ClientList" element={<ClientList />} />
                <Route path="Client/*" element={<Client />}/>
                <Route path="Billing" element={<Billing />}>
                    <Route path="/Billing/AddBill" element={<AddBill />} />
                </Route> 
                <Route path="PlansAndProducts" element={<PlansAndProducts />}>
                    <Route path="/PlansAndProducts/AddPlans" element={<AddPlans />} />
                    <Route path="/PlansAndProducts/AddProducts" element={<AddProducts />} />
                    <Route path="/PlansAndProducts/AddSurcharges" element={<AddSurcharges />} />
                </Route>
                <Route path="Plan/*" element={<Plan />}>
                <Route path="Plan/PlanGeneralData" element={<PlanGeneralData />}/>

                </Route>

            </Routes>
        </div>
    </div>)

function AdminHome() {
    return <h2>Administración</h2>;
}
}
export default Admin;