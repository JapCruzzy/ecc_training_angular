import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { Employee } from "./Employee";
import {Ticket} from "./Ticket";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = "/url/api/employees"
  constructor(private http: HttpClient) {}
  getEmployee() {
    return this.http.get<Employee[]>(
      `${this.url}/list`
    );
  }
  updateEmployee({employee}: { employee: any }) : Observable<Employee> {
    return this.http.put<Employee>(
      `${this.url}/update/${employee.id}`, employee
    );
  }
  public deleteEmployee({ employee }: { employee: any }) : Observable<void>{
    return this.http.delete<void>(
      `${this.url}/delete/${employee.id}`
    );
  }

  public createEmployee({ employee }: { employee: any }) : Observable<Employee> {
    return this.http.post<Employee>(
      `${this.url}/create`,
      employee
    );
  }

  public viewEmployee({ employee }: { employee: any }) : Observable<Employee>{
    return this.http.get<Employee>(
      `${this.url}/view/${employee.id}`
    );
  }

  public assignTicketToEmployee(ticketNo: number, employeeId: any) : Observable<Ticket>{
    return this.http.put<Ticket>(
      `${this.url}/assign-ticket/${ticketNo}?employeeNumber=${employeeId}`, employeeId
    );
  }

  public assignTicketWatchers(ticketNo: number,  watchers: any[] ) : Observable<Ticket>{
    let params = new HttpParams();
    if (watchers === undefined || watchers === null){
      return this.http.put<Ticket>(
        `${this.url}/add-watchers/${ticketNo}?employeeNumber`, watchers
      );
    }
    for (const watcher of watchers){
      params = params.append('employeeNumber', watcher)
    }
    return this.http.put<Ticket>(
      `${this.url}/add-watchers/${ticketNo}?`, watchers,  {params: params}
    );
  }

}
