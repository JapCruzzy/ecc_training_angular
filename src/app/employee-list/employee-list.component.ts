import {Component, OnInit} from '@angular/core';
import { Employee } from "../Employee";
import {EmployeeService} from "../employee.service";
import {NgForm} from "@angular/forms";
import {Ticket} from "../Ticket";


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  title = "Employee Management"
  employee: Employee[];
  ticket: Ticket[];
  assignee: Ticket[];
  watchers: Employee[];
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
  employeeViewDialog: {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    department: string;
    employeeNumber: number;
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

  displayAssignDialog: boolean;
  employeeAssignDialog: {
    assignee: Ticket[]
    watchers: Employee[]
  }

  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.employeeService
      .getEmployee()
      .subscribe((employees) => (this.employee = employees));
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

  clonedBooks: { [s: string]: Employee } = {};
  // onRowEditInit(employee: Employee) {
  //   console.log('Row edit initialized');
  //   this.clonedBooks[employee.id] = { ...employee };
  // }

  onEmployeeEdit(employee: Employee) {
    this.employeeEditDialog = {
      id: employee.id,
      employeeNumber: employee.employeeNumber,
      firstName: employee.firstName,
      middleName: employee.middleName,
      lastName: employee.lastName,
      department: employee.department
    };
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

  // onAssignTicketToEmployee(ticket: Ticket[]) {
  //   this.employeeService
  //     .assignTicketToEmployee({ ticket: ticket })
  //     .subscribe((data) => {
  //       this.displayAssignDialog = true;
  //       this.employeeAssignDialog.assignee = this.assignee;
  //       this.employeeAssignDialog.watchers = this.watchers
  //
  //       console.log(data);
  //
  //     });
  //
  // }


}
