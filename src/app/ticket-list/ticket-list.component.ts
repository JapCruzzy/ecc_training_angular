import {Component, OnInit} from '@angular/core';
import {Ticket} from "../Ticket";
import {TicketService} from "../ticket.service";
import {NgForm} from "@angular/forms";
import {Employee} from "../Employee";
import {EmployeeService} from "../employee.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  title = "Ticket Management";
  ticket: Ticket[];
  employee: Employee[];
  severity: any = [
    {name: 'LOW', value: 0},
    {name: 'NORMAL', value: 1},
    {name: 'MAJOR', value: 2},
    {name: 'CRITICAL', value: 3}
  ]

  status: any = [
    {name: 'IN PROGRESS', value: 2},
    {name: 'CLOSED', value: 3}
  ]
  displayDialog: boolean;
  addTicketDialog: {
    title: "",
    description: "",
    severity: "",
    status: 0

  };

  displayEditDialog: boolean;
  ticketEditDialog: Ticket = {
    ticketNo: 0,
    title: "",
    description: "",
    severity: "",
    status: "",
    assignee: null,
    watchers: []
  }

  displayViewDialog: boolean;
  ticketViewDialog: Ticket = {
    ticketNo: 0,
    title: "",
    description: "",
    severity: "",
    status: "",
    assignee: null,
    watchers: []
  }

  selectedAssignee: number=0;
  selectedWatchers?: number[];
  displayAssignDialog: boolean;
  employeeAssignDialog: Ticket = {
    description: "",
    severity: "",
    status: "",
    title: "",
    assignee: null,
    ticketNo: 0,
    watchers: []
  }

  constructor(private ticketService: TicketService, private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.ticketService
      .getTicket()
      .subscribe((tickets) => (this.ticket = tickets));
  }

  ngOnInitEmployee(): void {
    this.employeeService
      .getEmployee()
      .subscribe((employee) => (this.employee = employee))
  }

  onTicketAdd() {
    this.addTicketDialog = {
      title: "",
      description: "",
      severity: "",
      status: 0
    };
    this.displayDialog = true;
  }

  saveTicket(addForm: NgForm) {
    console.log('Ticket Saved');
    this.ticketService
      .createTicket({ticket: this.addTicketDialog})
      .subscribe((data) => {
        this.ngOnInit();
        alert('Ticket Created successfully.');
        addForm.reset();
      },
        (error : HttpErrorResponse) => {
          alert(error.message);
        });

    this.displayDialog = false;
  }

  onTicketEdit(ticket: Ticket) {
    this.ticketEditDialog = ticket;
    this.displayEditDialog = true;
  }

  onRowEditSave(ticket: Ticket) {
    console.log('Row edit saved');
    this.ticketService
      .updateTicket({ticket})
      .subscribe((data) => {
        this.ticketEditDialog = data;
        this.ngOnInit();
        alert('Employee Updated successfully.');
      },
        (error : HttpErrorResponse) => {
          alert(error.message);
        });
    this.displayEditDialog = false;
  }

  deleteTicket(ticket: Ticket) {
    console.log('Ticket Deleted');

    this.ticketService
      .deleteTicket({ticket: ticket})
      .subscribe((data) => {
        this.ngOnInit();
        alert('Ticket Deleted successfully.');
      }),
      (error : HttpErrorResponse) => {
        alert(error.message);
      };
  }

  viewTicket(ticket: Ticket) {
    this.ticketService
      .viewTicket({ticket: ticket})
      .subscribe((data) => {
        this.displayViewDialog = true;
        this.ticketViewDialog = data;
        console.log(data);

      });

  }

  onAssignTicketToEmployee(ticket: Ticket, employeeId: number) {

    this.employeeService
      .assignTicketToEmployee(ticket.ticketNo, employeeId)
      .subscribe((data) => {
        this.employeeAssignDialog = data;
        console.log(this.employeeAssignDialog.assignee);
        this.ngOnInit();
        // alert(`Ticket assigned to ${data.assignee.employeeNumber}`);
      },
        error => {
        alert(error.status + ": Please select an assignee")
        });

  }

  onAssignWatchers(ticket: Ticket, watchers: number[]) {

    this.employeeService
      .assignTicketWatchers(ticket.ticketNo, watchers)
      .subscribe((data) => {
        this.employeeAssignDialog = data;
        this.ngOnInit();
      });
  }

  onAssignTicket(ticket: Ticket, assignForm: NgForm) {

    if (this.selectedWatchers === undefined || this.selectedWatchers === null) {
      let emptyWatchers: number[];
      this.onAssignWatchers(ticket, emptyWatchers);
    } else {
      let newWatcher = this.selectedWatchers.map(Number);
      this.onAssignWatchers(ticket, newWatcher);
    }


    if(this.selectedAssignee != null || this.selectedAssignee != undefined) {
      this.onAssignTicketToEmployee(ticket, this.selectedAssignee);
    }

    this.employeeAssignDialog = this.ticketViewDialog;
    this.displayAssignDialog = false;
    this.displayViewDialog = false;
    assignForm.reset();
    alert("Ticket Assigned");

  }

  onAssignTicketDialog() {
    this.ngOnInit();
    this.ngOnInitEmployee();
    this.displayAssignDialog = true;
    this.displayViewDialog = false;
    this.employeeAssignDialog = this.ticketViewDialog;
    console.log(this.employeeAssignDialog.assignee)

  }

  // onSelectedEmployee(): number {
  //   console.log(this.selectedAssignee);
  //   return this.selectedAssignee;
  // }

  onSelectedWatcher(newWatchers: number[]) : number[] {
    if (this.selectedWatchers != null) {
      newWatchers = this.selectedWatchers.map(Number);
      console.log(newWatchers);
    }
    return newWatchers;
  }

  onClose(forms: NgForm): void {
    this.displayAssignDialog = false;
    this.displayEditDialog = false;
    this.displayDialog = false;
    this.displayViewDialog = false;
    forms.reset();
  }

  // protected readonly JSON = JSON;

}
