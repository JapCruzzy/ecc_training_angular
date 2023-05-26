import {Component, OnInit} from '@angular/core';
import { Ticket } from "../Ticket";
import { TicketService } from "../ticket.service";
import {NgForm} from "@angular/forms";
import {Employee} from "../Employee";
import {ConfirmationService, MessageService} from "primeng/api";


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit{

  title = "Ticket Management";
  ticket: Ticket[];
  employee: Employee;
  severity: any = [
    { name: 'LOW', value: 0 },
    { name: 'NORMAL', value: 1 },
    { name: 'MAJOR', value: 2 },
    { name: 'CRITICAL', value: 3 }
  ]

  status: any = [
    { name: 'NEW', value: 0 },
    { name: 'ASSIGNED', value: 1 },
    { name: 'IN PROGRESS', value: 2 },
    { name: 'CLOSED', value: 3 }
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

  constructor(private ticketService: TicketService) {}
  ngOnInit(): void {
    this.ticketService
      .getTicket()
      .subscribe((tickets) => (this.ticket = tickets));
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
      .createTicket({ ticket: this.addTicketDialog })
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
      .deleteTicket({ ticket: ticket })
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
      .viewTicket({ ticket: ticket })
      .subscribe((data) => {
        this.displayViewDialog = true;
        this.ticketViewDialog = data;
        console.log(data);

      });

  }

  protected readonly JSON = JSON;
}
