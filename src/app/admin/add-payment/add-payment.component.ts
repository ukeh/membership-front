import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { AdminService, payment } from 'src/app/services/admin.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  id: string = '';
  paymentForm !: FormGroup;
  submitted = false;

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
    this.paymentForm = new FormGroup({
      from: new FormControl('', [Validators.required]),
      to: new FormControl('', [Validators.required]),
      paymentDate: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required]),
    });
  }


  addPayment() {
    this.submitted = true;
    if (this.paymentForm.invalid) {
      return;
    }
    this.submitted = false;
    let formData = this.paymentForm.getRawValue();
    formData['id'] = this.id;
    let data: payment = formData;
    this.adminService.addPayment(data)
      .subscribe((payload) => {
        let response = JSON.parse(JSON.stringify(payload));
        if (!response.isError) {
          this.toastr.success(response.message);
          this.router.navigate(['/admin/payment'], { queryParams: { 'id': this.id } });
        }
        else {
          this.toastr.error(response.message);
        }
      }, (error) => {
        this.toastr.error(error.status + " " + error.statusText);
      })
  }


  get f() {
    return this.paymentForm.controls;
  }
}
