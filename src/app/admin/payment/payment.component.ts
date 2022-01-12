import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  user: any;
  id: string = '';

  constructor(
    private local: LocalStorageService,
    private toastr: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.pipe().subscribe((params) => {
      this.id = params['id'];
      if (!this.id) {
        this.router.navigateByUrl('/');
      }
    });

  }

  ngOnInit(): void {
    this.getUser();

  }


  getUser() {
    this.user = null;
    this.adminService.getUser(this.id)
      .subscribe((payload) => {
        let response = JSON.parse(JSON.stringify(payload));
        if (!response.isError) {
          this.user = response.data.record;
        }
        else {
          this.toastr.error(response.message);
        }
      }, (error) => {
        this.toastr.error(error.status + " " + error.statusText);
      })
  }
}
