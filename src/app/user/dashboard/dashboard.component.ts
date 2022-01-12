import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { storage } from 'src/app/services/login.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData: any;



  constructor(
    private local: LocalStorageService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    let token = this.local.retrieve('token');
    let type = this.local.retrieve('type');
    if (!token || type === "ADMIN") {
      this.local.clear();
      this.router.navigateByUrl('/');
    }
    else {
      this.userData = {
        fullname: this.local.retrieve('fullname'),
        email: this.local.retrieve('email'),
        mobile: this.local.retrieve('mobile'),
        status: this.local.retrieve('status')
      }
    }
  }

  ngOnInit(): void {

  }


  logout() {
    this.local.clear();
    this.router.navigateByUrl('/');
  }

}
