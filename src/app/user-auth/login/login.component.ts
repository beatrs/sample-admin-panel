import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usersList : any[] = [];
  isLoggedIn = false;
  loginForm : FormGroup = new FormGroup({});
  constructor(
    private userService:UserServiceService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    //this.getUsers();
    console.log(this.userService.getAllUsers());
    this.isLoggedIn = this.userService.getIsLoggedIn();
    if (this.isLoggedIn) {
      this.router.navigate(['dashboard']);
    }

    //* Form builder
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  signIn(user:any) {
    console.log(this.usersList);
    
    const exists = this.userService.verifyUser(user);
    if (exists) {
      console.log('logged in');
      // this.userService.setIsLoggedIn(true, user);
      alert('Sign in successful!');
      this.router.navigate(['dashboard'])
        // .then(() => {
        //   window.location.reload();
        // });
    }
    else {
      
      alert('Sign in failed! No such account exists yet');
      console.log('no such account');
    }

  }

  async getUsers() {
    await this.userService.getUsers()
      .subscribe((res:any) => {this.usersList = res});
  }

}
