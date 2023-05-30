import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {TicketListComponent} from "./ticket-list/ticket-list.component";

const routes: Routes = [

  { path: '', redirectTo: 'employees/list', pathMatch: 'full' },
  { path: 'employees/list', component: EmployeeListComponent },
  { path: 'employees/:id', component: EmployeeListComponent },
  { path: 'tickets/list', component: TicketListComponent },
  { path: 'tickets/:id', component: TicketListComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
