import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  adminData: any;


  constructor(
    private local: LocalStorageService,
    private toastr: ToastrService,
    private router: Router,
    private adminService: AdminService
  ) {
    let token = this.local.retrieve('token');
    let type = this.local.retrieve('type');
    if (!token || type === "USER") {
      this.local.clear();
      this.router.navigateByUrl('/');
    }
    else {
      this.adminData = {
        fullname: this.local.retrieve('fullname'),
        email: this.local.retrieve('email'),
        mobile: this.local.retrieve('mobile')
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
