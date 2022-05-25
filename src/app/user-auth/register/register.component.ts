import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup = new FormGroup({});

  constructor(
    private userService : UserServiceService,
    private router: Router,
    private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.getUsers();
    const isLoggedIn = this.userService.getIsLoggedIn();
    console.log(isLoggedIn);
    if (isLoggedIn) {
      this.router.navigate(['dashboard']);
    }

    this.registerForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    })
  }

  usersList : any[] = [];
  async getUsers() {
    await this.userService.getUsers()
      .subscribe((res:any) => {this.usersList = res});
  }
  
  signUp(newUser:User) {
    // let id = this.userService.getUsers().length;
    // this.userService.addUser(
    //   new User({id: id, email: user.email, password: user.password})
    // );

    this.userService.addUser(newUser).subscribe((res) => {
      if(res)
        alert('Sign Up successful')
        this.router.navigate(['login'])
    })

    // console.log(newUser);
    // console.log(this.usersList);
    
  }

  

}
