import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { login, LoginService } from 'src/app/services/login.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  loginData!: FormGroup;
  submitted = false;

  constructor(
    private loginService: LoginService,
    private local: LocalStorageService,
    private toastr: ToastrService,
    private router: Router,
    private location: Location
  ) {
    let token = this.local.retrieve('token');
    let type = this.local.retrieve('type');
    if (token) {
      if (type === 'ADMIN') {
        this.router.navigateByUrl('/admin');
      }
      else {
        this.router.navigateByUrl('/user');
      }
    }
  }

  ngOnInit(): void {
    this.loginData = new FormGroup({
      "email": new FormControl('', [Validators.required, Validators.email]),
      "password": new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    });
  }


  loginUser() {
    this.submitted = true;
    if (this.loginData.invalid) {
      return;
    }
    this.submitted = false;
    let data: login = this.loginData.getRawValue();
    this.loginService.userLlogin(data)
      .subscribe((payload) => {
        let response = JSON.parse(JSON.stringify(payload));
        if (!response.isError) {
          this.loginService.setLocalStorage(response.data);
          this.toastr.success(response.message);
          response.data.type === "ADMIN" ?
            this.router.navigateByUrl('/admin') :
            this.router.navigateByUrl('/user');
        }
        else {
          this.toastr.error(response.message);
        }
      }, (error) => {
        this.toastr.error(error.status + " " + error.statusText);
      })
  }

  get f() {
    return this.loginData.controls;
  }
  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


}
