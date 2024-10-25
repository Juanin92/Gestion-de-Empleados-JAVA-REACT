package com.gestorEmpleado.Service;

import com.gestorEmpleado.Model.Employee;

import java.util.List;

public interface IEmployeeService {

    List<Employee> getAll();
    Employee getById(Long id);
    Employee createEmployee(Employee employee);
    void eliminateEmployee(Long id);
}
