package com.gestorEmpleado.Controller;

import com.gestorEmpleado.Exception.ExceptionNotFound;
import com.gestorEmpleado.Model.Employee;
import com.gestorEmpleado.Service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * CrossOrigin: Habilita el intercambio de recursos entre distintos orígenes (CORS).
 * En este caso, permite que las solicitudes HTTP desde el frontend (React) que corre
 * en http:localhost:3000 puedan comunicarse con este backend sin problemas.
 * Esto es necesario porque por defecto, los navegadores bloquean las solicitudes que se
 * hacen desde un origen diferente (el frontend y backend tienen puertos distintos).
 */
@RestController
@RequestMapping("EmployeeApp")
@CrossOrigin(value = "http://localhost:3000")
public class EmployeeController {

    @Autowired private IEmployeeService employeeService;

    @GetMapping("/Employee")
    public List<Employee> getEmployee(){
        return employeeService.getAll();
    }

    /**
     * RequestBody: Convierte el cuerpo de la solicitud (en formato JSON)
     * a un objeto Java del tipo Employee. Esto permite recibir un empleado
     * en formato JSON desde el frontend y automáticamente mapearlo a
     * un objeto Employee en Java para poder manipularlo en el backend.
     */
    @PostMapping("/Employee")
    public Employee addEmployee(@RequestBody Employee employee){
        return employeeService.createEmployee(employee);
    }

    /**
     * ResponseEntity: Se usa para encapsular tanto el cuerpo de la respuesta
     * como el código de estado HTTP. Aquí, ResponseEntity.ok() indica que
     * la solicitud fue exitosa y devuelve el empleado con un código de estado
     * HTTP 200 (OK).
     */
    @GetMapping("/Employee/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id){
        Employee employee = employeeService.getById(id);
        if (employee != null){
            return ResponseEntity.ok(employee);
        }else {
           throw new ExceptionNotFound(("No se encontró el ID del empleado"));
        }

    }

    @PutMapping("/Employee/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id, @RequestBody Employee employeeReceive){
        Employee employee = employeeService.getById(id);
        employee.setName(employeeReceive.getName());
        employee.setRut(employeeReceive.getRut());
        employee.setAge(employeeReceive.getAge());
        employee.setEmail(employeeReceive.getEmail());
        employee.setSalary(employeeReceive.getSalary());
        employeeService.createEmployee(employee);
        return ResponseEntity.ok(employee);
    }

    /**
     * Map<String, Boolean>: Es una estructura de datos que almacena par clave-valor.
     * En este caso, se usa un mapa para devolver una respuesta simple donde la clave
     * es "Eliminado" y el valor es `TRUE`, indicando que el empleado fue eliminado con éxito.
     * Esto es útil para devolver una respuesta clara en JSON.
     */
    @DeleteMapping("/Employee/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable long id){
        Employee employee = employeeService.getById(id);
        if (employee == null){
            throw new ExceptionNotFound("No se encontró el empleado para eliminar");
        }
        employeeService.eliminateEmployee(employee.getId());
        Map<String, Boolean> response = new HashMap<>();
        response.put("Eliminado", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
