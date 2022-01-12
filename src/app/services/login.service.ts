import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "ngx-webstorage";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  baseURL = environment.serverURL;

  constructor(
    private local: LocalStorageService,
    private http: HttpClient,
    private router: Router,
  ) { }


  userLlogin(loginData: login) {
    return this.http.post(`${this.baseURL}/authenticate/signin`, loginData);
  }

  setLocalStorage(data: storage) {
    this.local.store('token', data.token);
    this.local.store('fullname', data.fullname);
    this.local.store('email', data.email);
    this.local.store('mobile', data.mobile);
    this.local.store('type', data.type);
    this.local.store('status', data.status);
  }


}


export interface login {
  email: string,
  password: string
}


export interface storage {
  token: string,
  fullname: string,
  email: string,
  mobile: string,
  type: string,
  status: string
}
