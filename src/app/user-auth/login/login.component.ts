import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usersList : User[] = [];
  constructor(
    private userService:UserServiceService,
    private router: Router) { }

  ngOnInit(): void {
    //this.getUsers();
    console.log(this.userService.getAllUsers());
  }

  signIn(user:User) {
    console.log(this.usersList);
    
    const exists = this.userService.verifyUser(user);
    if (exists) {
      console.log('logged in');
      this.userService.setIsLoggedIn(true, user);
      alert('Sign in successful!');
      this.router.navigate(['dashboard'])
        .then(() => {
          window.location.reload();
        });
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
