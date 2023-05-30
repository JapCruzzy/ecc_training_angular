import {Component, OnInit} from '@angular/core';
import {Ticket} from "../Ticket";
import {TicketService} from "../ticket.service";
import {NgForm} from "@angular/forms";
import {Employee} from "../Employee";
import {EmployeeService} from "../employee.service";
import {forkJoin} from "rxjs";


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
    {name: 'NEW', value: 0},
    {name: 'ASSIGNED', value: 1},
    {name: 'IN PROGRESS', value: 2},
    {name: 'CLOSED', value: 3}
  ]
  displayDialog: boolean;
  addTicketDialog: {
    ticketNo: 0,
    title: "",
    description: "",
    severity: "",
    status: ""

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
  ticketViewDialog: Ticket

  selectedAssignee: number;
  selectedWatchers: number[] = [];
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
      ticketNo: 0,
      title: "",
      description: "",
      severity: "",
      status: ""
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
      });
  }

  // confirm(event: Event, ticket: Ticket) {
  //   this.confirmationService.confirm({
  //     target: event.target,
  //     message: 'Are you sure that you want to proceed?',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' })
  //       this.deleteTicket(ticket);
  //     },
  //     reject: () => {
  //       this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
  //     }
  //   });
  // }

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
        this.displayAssignDialog = false;
      });

  }

  onAssignWatchers(ticket: Ticket, watchers: number[]) {

    this.employeeService
      .assignTicketWatchers(ticket.ticketNo, watchers)
      .subscribe((data) => {
        this.employeeAssignDialog = data;
        console.log(this.employeeAssignDialog.watchers);
        console.log(data);
      });
  }

  onAssignTicket(ticket: Ticket, employeeId: number, watchers: number[]) {
    this.onAssignTicketToEmployee(ticket, employeeId);
    if (watchers.length > 0) {
      this.onAssignWatchers(ticket, watchers);
    }
    alert("Ticket Assigned");
  }

  onAssignTicketDialog() {
    this.ngOnInit();
    this.ngOnInitEmployee();
    this.displayAssignDialog = true;
    this.employeeAssignDialog = this.ticketViewDialog;
    console.log(this.employeeAssignDialog)

  }

  onSelectedEmployee(): number {
    console.log(this.selectedAssignee);
    return this.selectedAssignee;
  }

  onSelectedWatcher(): number[] {
    console.log(this.selectedWatchers)
    // let empNum = [];
    // for (let i = 0; i < this.selectedWatchers.length; i++) {
    //   empNum[i] = this.selectedWatchers[i].employeeNumber
    // }
    return this.selectedWatchers;
  }

  onClose(): void {
    this.displayEditDialog = false;
    this.displayDialog = false;
    this.displayViewDialog = false;
  }

  protected readonly JSON = JSON;
}
