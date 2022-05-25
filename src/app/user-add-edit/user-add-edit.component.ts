import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user.model';
import { UserServiceService } from '../services/user-service.service';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl, AbstractControl } from '@angular/forms';

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
  modalForm : FormGroup = new FormGroup({});

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserServiceService,
    private fb: FormBuilder) { }

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

    this.modalForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });

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
      this.userService.updateUser(userData)
        .subscribe((res) => console.log(res));

        alert('User succesfully updated!');
    }
    this.closeModal();
    this.getUsers();

  }

  usersList : any[] = [];
  async getUsers() {
    await this.userService.getUsers()
      .subscribe((res:any) => {this.usersList = res});
  }

  //TODO: change id generation 
  saveNewUser(newUser:any) {
    this.userService.addUser(newUser)
      .subscribe((res) => console.log(res));
  }

}
