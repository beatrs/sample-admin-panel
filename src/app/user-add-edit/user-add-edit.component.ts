import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user.model';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})

export class UserAddEditComponent implements OnInit {

  @Input() public user: any;
  @Input() public type: any;

  title = '';
  activeUser = new User({id: 0, first_name: '', last_name: '', email: '', password: '', isDeleted: true});
  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserServiceService) { }

  ngOnInit(): void {
    console.log(this.user)
    this.getUsers();
    if (this.user)
      this.activeUser = this.user;

    if (this.type === 'post') {
      this.title = 'Add New User';
    } else if (this.type === 'put') {
      this.title = 'Edit User';
    }
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  logRes(val:any) {
    console.log(val);
  }

  saveUser(userData:User) {
    if (this.type === 'post') {
      this.saveNewUser(userData);
      alert('User succesfully added!');
        
    } else if (this.type == 'put') {
      this.userService.updateUser(this.user.id, userData)
        .subscribe((res) => console.log(res));

        alert('User succesfully updated!');
    }
    this.closeModal();
    window.location.reload();

  }

  usersList : User[] = [];
  async getUsers() {
    await this.userService.getUsers()
      .subscribe((res:any) => {this.usersList = res});
  }

  //TODO: change id generation 
  saveNewUser(userData:User) {
    let uId = this.usersList.length + 1;
    let newUser = new User({
      id: uId,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: userData.password,
      isDeleted: false
    });

    this.userService.addUser(newUser)
      .subscribe((res) => console.log(res));
  }

}
