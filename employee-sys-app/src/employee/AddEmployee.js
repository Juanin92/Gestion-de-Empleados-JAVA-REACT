import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddEmployee() {

    let navigation = useNavigate();

    const [employee, setEmployee] =  useState({
        name:"",
        rut:"",
        age:"",
        email:"",
        salary:""
    })

    const{name, rut, age, email, salary} = employee

    const onInputChange = (e) => {
        setEmployee({...employee, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/EmployeeApp/Employee";
        await axios.post(urlBase, employee);
        navigation("/")
    }

  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Agregar Empleado</h3>
        </div>

        <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="name" name='name' required={true} value={name} onChange={(e)=>onInputChange(e)}/>      
            </div>
            <div className="mb-3">
                <label htmlFor="rut" className="form-label">Rut</label>
                <input type="text" className="form-control" id="rut" name='rut' value={rut} onChange={(e)=>onInputChange(e)}/>      
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Edad</label>
                <input type="number" className="form-control" id="age" name='age' value={age} onChange={(e)=>onInputChange(e)}/>      
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name='email' value={email} onChange={(e)=>onInputChange(e)}/>      
            </div>
            <div className="mb-3">
                <label htmlFor="salary" className="form-label">Sueldo</label>
                <input type="number" className="form-control" id="salary" name='salary' value={salary} onChange={(e)=>onInputChange(e)}/>      
            </div>
            <div className='text-center'>
                <button type="submit" className="btn btn-primary btn-sm me-3">Agregar</button>
                <a href='/' className='btn btn-danger btn-sm'>Regresar</a>
            </div>
        </form>
    </div>
  )
}
