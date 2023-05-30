import {Component, OnInit} from '@angular/core';
import { Employee } from "../Employee";
import {EmployeeService} from "../employee.service";
import {NgForm} from "@angular/forms";
import {Ticket} from "../Ticket";
import {TicketService} from "../ticket.service";


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  title = "Employee Management"
  employee: Employee[];
  ticket: Ticket[];
  departments: any = [
    { name: 'IT', value: 0 },
    { name: 'ADMIN', value: 1 },
    { name: 'HR', value: 2 },
    { name: 'SALES', value: 3 },
  ]
  displayDialog: boolean;
  employeeDialog: Employee = {
    id: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    department: "",
    employeeNumber: 0

  };
  displayViewDialog: boolean;
  employeeViewDialog: Employee = {
    id: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    department: "",
    employeeNumber: 0
  }

  displayEditDialog: boolean;
  employeeEditDialog: Employee = {
    id: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    department: "",
    employeeNumber: 0
  }

  constructor(private employeeService: EmployeeService, private ticketService: TicketService) {}
  ngOnInit(): void {
    this.employeeService
      .getEmployee()
      .subscribe((employees) => (this.employee = employees));
  }

  ngOnInitTicket(): void {
    this.ticketService
      .getTicket()
      .subscribe((tickets) => (this.ticket = tickets))

  }

  onEmployeeAdd() {
    this.employeeDialog = {
      id: 0,
      employeeNumber: 0,
      firstName: "",
      middleName: "",
      lastName: "",
      department: ""
    };
    this.displayDialog = true;
  }
  saveEmployee(addForm: NgForm) {
    console.log('Employee Saved');
    this.employeeService
      .createEmployee({ employee: this.employeeDialog })
      .subscribe((data) => {
        this.ngOnInit();
        alert('Employee Created successfully.');
        addForm.reset();
      });

    this.displayDialog = false;
  }

  // clonedBooks: { [s: string]: Employee } = {};
  // onRowEditInit(employee: Employee) {
  //   console.log('Row edit initialized');
  //   this.clonedBooks[employee.id] = { ...employee };
  // }



  onEmployeeEdit(employee: Employee) {
    this.employeeEditDialog = employee;
    this.displayEditDialog = true;
  }
  onRowEditSave(employee: Employee) {
    console.log('Row edit saved');
    this.employeeService
      .updateEmployee({employee})
      .subscribe((data) => {
        this.employeeEditDialog = data;
        this.ngOnInit();
        alert('Employee Updated successfully.');
      });
    this.displayEditDialog = false;
  }
  deleteEmployee(employee: Employee) {
    console.log('Employee Deleted');

    this.employeeService
      .deleteEmployee({ employee: employee })
      .subscribe((data) => {
        this.ngOnInit();
        alert('Employee Deleted successfully.');
      });
  }

  viewEmployee(employee: Employee) {
    this.employeeService
      .viewEmployee({ employee: employee })
      .subscribe((data) => {
        this.displayViewDialog = true;
        this.employeeViewDialog = data;
        console.log(data);
      });

  }
}
