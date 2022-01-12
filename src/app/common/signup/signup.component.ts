import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { SignupService, register } from 'src/app/services/signup.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  registerForm!: FormGroup;
  submitted = false;


  constructor(
    private signupService: SignupService,
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
    this.registerForm = new FormGroup({
      "fullname": new FormControl('', [Validators.required]),
      "address": new FormControl('', [Validators.required]),
      "gender": new FormControl('MALE', [Validators.required]),
      "mobile": new FormControl('', [Validators.required]),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "password": new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    });
  }


  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.submitted = false;
    let data: register = this.registerForm.getRawValue();
    this.signupService.registerUser(data)
      .subscribe((payload) => {
        let response = JSON.parse(JSON.stringify(payload));
        if (!response.isError) {
          this.toastr.success(response.message);
          this.router.navigateByUrl('/');
        }
        else {
          this.toastr.error(response.message);
        }
      }, (error) => {
        this.toastr.error(error.status + " " + error.statusText);
      })
  }

  get f() {
    return this.registerForm.controls;
  }
  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
