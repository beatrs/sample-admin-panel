import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

import { UserAddEditComponent } from '../user-add-edit/user-add-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserViewDetailsComponent } from '../user-view-details/user-view-details.component';
import { ModalConfirmComponent } from '../shared/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})

export class UserDashboardComponent implements OnInit {

  count = 1;
  isLoggedIn = this.userService.getIsLoggedIn();

  constructor(
    private userService: UserServiceService,
    private router: Router,
    public modalService: NgbModal) { }

  ngOnInit(): void {
    // this.isLoggedIn = this.userService.getIsLoggedIn();

    this.isLoggedIn = this.userService.getIsLoggedIn();
    if(!this.isLoggedIn) {
      this.router.navigate(['']);
    } else {
      this.fetchUsers();
    }
  }

  // logout() {
  //   this.isLoggedIn = false;
  //   this.userService.setIsLoggedIn(this.isLoggedIn);
  // }

  USERS: any;
  page = 1;
  pageSize = 4;
  users: User[] = [];
  collectionSize = 1;

  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (res) => {
        this.USERS = res.filter((user:User) => user.isDeleted !== true);
        console.log(res);
        this.collectionSize = this.USERS.length;
        this.users = this.USERS;
      });
  }

  refreshUsers() {
    this.users = this.USERS
      .map((user:any, i:any) => ({
        id: i + 1, ...user
      }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize); 
  }

  // * add / edit modal

  openModal(user: User) {
    const modalRef = this.modalService.open(UserAddEditComponent);
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.type = 'put';
    modalRef.result.then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err);
    });
  }

  openAddModal() {
    const modalRef = this.modalService.open(UserAddEditComponent);
    modalRef.componentInstance.type = 'post';
    modalRef.result.then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err);
    });
  }

  openViewModal(user: User) {
    console.log(this.userService.getUser(user.id));
    const modalRef = this.modalService.open(UserViewDetailsComponent);
    modalRef.componentInstance.user = user;
    modalRef.result.then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err);
    });
  }

  openDeleteModal(user:User) {
    const modalRef = this.modalService.open(ModalConfirmComponent);
    modalRef.componentInstance.user = user;
    modalRef.result.then((res) => {
      if (res) {
        this.deleteUser(user);
      }
    }).catch((err) => {
      console.error(err);
    })
  }

  deleteUser(user:User) {
    this.userService.removeUser(user).subscribe((res) => console.log(res));
    this.users = this.USERS.filter((USER:any) => USER.id !== user.id);
  }
}
