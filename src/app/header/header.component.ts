import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Admin Panel'
  isLoggedIn = this.userService.getIsLoggedIn();

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.getIsLoggedIn();
    console.log('header component')
  }

  logout() {
    this.isLoggedIn = false;
    this.userService.setIsLoggedIn(this.isLoggedIn);
    window.location.reload();
  }

}
