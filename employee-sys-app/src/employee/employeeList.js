import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function EmployeeList() {
  const urlBase = "http://localhost:8080/EmployeeApp/Employee";
  const [employees, setEmployee] = useState([]);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const response = await axios.get(urlBase);
    console.log("Resultado cargar empleados");
    console.log(response.data);
    setEmployee(response.data);
  };

  const EliminateEmployee = async (id)=>{
    await axios.delete(`${urlBase}/${id}`)
    loadEmployee();
  }

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Sistema de Empleados</h3>
      </div>

      <table class="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">RUT</th>
            <th scope="col">Edad</th>
            <th scope="col">Email</th>
            <th scope="col">Sueldo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            // Iteramos el array de empleados
            employees.map((employee, index) => (
              <tr key={index}>
                <th scope="row">{employee.id}</th>
                <td>{employee.name}</td>
                <td>{employee.rut}</td>
                <td>{employee.age}</td>
                <td>{employee.email}</td>
                <td><NumericFormat value={employee.salary} 
                displayType="text" thousandSeparator="," prefix="$" 
                decimalScale={0} fixedDecimalScale/>
                </td>
                <td className="text-center">
                    <div>
                        <Link to={`/updateEmployee/${employee.id}`} className="btn btn-warning btn-sm me-3">Editar</Link>
                        <button onClick={()=> EliminateEmployee(employee.id)} className="btn btn-danger btn-sm">Eliminar</button>
                    </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
