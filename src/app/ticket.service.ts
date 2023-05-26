import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Ticket } from "./Ticket";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {}
  getTicket() {
    return this.http.get<Ticket[]>(
      '/url/api/tickets/list'
    );
  }
  updateTicket({ticket}: { ticket: any }) {
    return this.http.put<Ticket>(
      `/url/api/tickets/update/${ticket.ticketNo}`, ticket
    );
  }
  public deleteTicket({ ticket }: { ticket: any }) {
    return this.http.delete<Ticket>(
      `/url/api/tickets/delete/${ticket.ticketNo}`
    );
  }

  public createTicket({ ticket }: { ticket: any }) {
    return this.http.post<Ticket>(
      '/url/api/tickets/create',
      ticket
    );
  }

  public viewTicket({ ticket }: { ticket: any }){
    return this.http.get<Ticket>(
      `/url/api/tickets/view/${ticket.ticketNo}`
    );
  }
}
