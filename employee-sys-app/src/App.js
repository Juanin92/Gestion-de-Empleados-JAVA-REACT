import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeList from "./employee/employeeList";
import Navigation from "./template/Navigation";
import AddEmployee from "./employee/AddEmployee";
import UpdateEmployee from "./employee/UpdateEmployee";

function App() {
  return (
    <div className="container text-center">
     <BrowserRouter>
     <Navigation/>
     <Routes>
       <Route exact path="/" element={<EmployeeList/>}></Route>
       <Route exact path="/addEmployee" element={<AddEmployee/>}></Route>
       <Route exact path="/updateEmployee/:id" element={<UpdateEmployee/>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
