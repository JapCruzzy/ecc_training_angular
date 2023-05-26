import {Employee} from "./Employee";

export interface Ticket {

  ticketNo: number;

  title: string;

  description: string;

  severity: string;

  status: string;

  assignee: Employee;

  watchers: Employee[];
}
