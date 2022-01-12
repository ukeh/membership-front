import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { AdminService, statusUpdate } from 'src/app/services/admin.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [];
  isCheckedAll = false;

  constructor(
    private local: LocalStorageService,
    private toastr: ToastrService,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getUsers();

  }


  getUsers() {
    this.users = [];
    this.adminService.getUsers()
      .subscribe((payload) => {
        let response = JSON.parse(JSON.stringify(payload));
        if (!response.isError) {
          this.users = response.data.records.map((record: any) => {
            return { ...record, isChecked: false };
          });
        }
        else {
          this.toastr.error(response.message);
        }
      }, (error) => {
        this.toastr.error(error.status + " " + error.statusText);
      })
  }


  updateStatus(event: any, id: string) {
    let data: statusUpdate = {
      id: id,
      status: event.value
    }
    this.adminService.updateUserStatus(data)
      .subscribe((payload) => {
        let response = JSON.parse(JSON.stringify(payload));
        if (!response.isError) {
          this.toastr.success(response.message);
          this.getUsers();
        }
        else {
          this.toastr.error(response.message);
        }
      }, (error) => {
        this.toastr.error(error.status + " " + error.statusText);
      });

  }


  updateLoginStatus(event: any, id: string) {
    let data: statusUpdate = {
      id: id,
      isBlocked: event.value
    }
    this.adminService.updateUserStatus(data)
      .subscribe((payload) => {
        let response = JSON.parse(JSON.stringify(payload));
        if (!response.isError) {
          this.toastr.success(response.message);
          this.getUsers();
        }
        else {
          this.toastr.error(response.message);
        }
      }, (error) => {
        this.toastr.error(error.status + " " + error.statusText);
      });
  }


  sendDueReminder() {
    let data = this.getEmailList(this.users);
    this.adminService.sendDueReminder(data)
      .subscribe((payload) => {
        let response = JSON.parse(JSON.stringify(payload));
        if (!response.isError) {
          this.toastr.success(response.message);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/admin/members']);
          });
        }
        else {
          this.toastr.error(response.message);
        }
      }, (error) => {
        this.toastr.error(error.status + " " + error.statusText);
      });
  }


  toggleCheck() {
    this.isCheckedAll = !this.isCheckedAll;
    let flag = this.isCheckedAll;
    this.users = this.users.map((record: any) => {
      record.isChecked = flag;
      return record;
    });
  }

  getEmailList(records: Array<any>): Array<string> {
    let emailList = [];
    for (let record of records) {
      if (record.isChecked) {
        emailList.push(record.email)
      }
    }
    return emailList;
  }

}
