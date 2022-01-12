import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "ngx-webstorage";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseURL = environment.serverURL;

  constructor(
    private local: LocalStorageService,
    private http: HttpClient,
    private router: Router,
  ) { }

  getUsers() {
    let token = this.local.retrieve('token');
    return this.http.get(`${this.baseURL}/admin/users/all/${token}`);
  }


  getUser(id: string) {
    let token = this.local.retrieve('token');
    return this.http.get(`${this.baseURL}/admin/user/${token}`, { params: { "id": id } });
  }


  addPayment(data: payment) {
    let token = this.local.retrieve('token');
    return this.http.post(`${this.baseURL}/admin/payment/${token}`, data);
  }

  updateUserStatus(data: statusUpdate) {
    let token = this.local.retrieve('token');
    return this.http.put(`${this.baseURL}/admin/user/${token}`, data);
  }

  sendDueReminder(emails: Array<string>) {
    let token = this.local.retrieve('token');
    return this.http.post(`${this.baseURL}/admin/email/${token}`, { "emailList": emails });
  }
}


export interface payment {
  from: string,
  to: string,
  paymentDate: string,
  amount: number,
  id: string
}


export interface statusUpdate {
  id: string,
  status?: string,
  isBlocked?: boolean
}