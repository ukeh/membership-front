import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocalStorageService } from "ngx-webstorage";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  baseURL = environment.serverURL;

  constructor(
    private local: LocalStorageService,
    private http: HttpClient,
    private router: Router,
  ) { }


  registerUser(data: register) {
    return this.http.post(`${this.baseURL}/authenticate/signup/user`, data);
  }
}

export interface register {
  email: string,
  password: string,
  mobile: string,
  fullname: string,
  gender: string,
  address: string
}
