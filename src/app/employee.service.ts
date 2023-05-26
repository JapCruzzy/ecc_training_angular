import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Employee } from "./Employee";
import {Ticket} from "./Ticket";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}
  getEmployee() {
    return this.http.get<Employee[]>(
      '/url/api/employees/list'
    );
  }
  updateEmployee({employee}: { employee: any }) : Observable<Employee> {
    return this.http.put<Employee>(
      `/url/api/employees/update/${employee.id}`, employee
    );
  }
  public deleteEmployee({ employee }: { employee: any }) : Observable<void>{
    return this.http.delete<void>(
      `/url/api/employees/delete/${employee.id}`
    );
  }

  public createEmployee({ employee }: { employee: any }) : Observable<Employee> {
    return this.http.post<Employee>(
      '/url/api/employees/create',
      employee
    );
  }

  public viewEmployee({ employee }: { employee: any }) : Observable<Employee>{
    return this.http.get<Employee>(
      `/url/api/employees/view/${employee.id}`
    );
  }

  public assignTicketToEmployee({ ticket }: { ticket: Ticket }) : Observable<Ticket>{
    return this.http.put<Ticket>(
      `/url/api/employees/assign-ticket/${ticket.ticketNo}`, ticket
    );
  }

}
