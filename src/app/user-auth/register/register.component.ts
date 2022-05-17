import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService : UserServiceService,
    private router: Router,) {
  }


  ngOnInit(): void {
    this.getUsers();
    
  }
  
  signUp(user:User) {
    // let id = this.userService.getUsers().length;
    // this.userService.addUser(
    //   new User({id: id, email: user.email, password: user.password})
    // );
    let uId = this.usersList.length + 1;
    let newUser = new User({
      id: uId,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      isDeleted: false
    });

    this.userService.addUser(newUser).subscribe((res) => {
      if(res)
        alert('Sign Up successful')
        this.router.navigate(['login'])
    })

    // console.log(newUser);
    // console.log(this.usersList);
    
  }

  usersList : User[] = [];
  async getUsers() {
    await this.userService.getUsers()
      .subscribe((res:any) => {this.usersList = res});
  }

}
