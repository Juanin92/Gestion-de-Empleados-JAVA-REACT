package com.gestorEmpleado.Service;

import com.gestorEmpleado.Model.Employee;
import com.gestorEmpleado.Repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService implements IEmployeeService{

    @Autowired private EmployeeRepo employeeRepo;

    @Override
    public List<Employee> getAll() {
        return employeeRepo.findAll();
    }

    @Override
    public Employee getById(Long id) {
        return employeeRepo.findById(id).orElse(null);
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    @Override
    public void eliminateEmployee(Long id) {
        employeeRepo.deleteById(id);
    }
}
