import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TicketListComponent} from "./ticket-list/ticket-list.component";

const routes: Routes = [

  { path: '', redirectTo: 'employees/list', pathMatch: 'full' },
  { path: 'employees/list', component: EmployeeListComponent },
  { path: 'tickets/list', component: TicketListComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
