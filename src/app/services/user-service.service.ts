import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sha256 } from 'js-sha256';

import { environment } from 'src/environments/environment';

declare let process:any;
const env = process.env.NODE_ENV;

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  public get environmentName() {
    return environment.environment;
  }

  users : User[] = [];
  user : any;
  url : any;
  //* local
  // url = "http://localhost:3000/users"; 
  //* heroku
  herokoUrl = "https://ap-jsonserver.herokuapp.com/users";
  //* glitch
  glitchUrl = "https://grove-aware-straw.glitch.me/users";
  isLoggedIn = false;
  activeUser : any;


  constructor(private http: HttpClient) { 
    // console.log(this.environmentName());

    // * deployment
    // if (env !== 'production') {
    //   this.url = this.glitchUrl; 
    // } else {
    //   this.url = this.herokoUrl;
    // }

    
    this.url = this.glitchUrl; 
    this.getAllUsers();
    console.log(this.users);

    // this.initUsers();
  }


  initUsers() {
    // this.users.push(
    //   {id:0, email:'john@test.com', password:'password'},
    //   {id:1, email:'ram@test.com', password:'password'},
    //   {id:2, email:'fran@test.com', password:'password'},
    // )
  }

  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  getAllUsers() {
    this.getUsers().subscribe((res) => {this.users = res});
  }

  getUser(id: number) {
    return this.http.get(this.url+`/${id}`).subscribe((res) => {this.user = res});
  }

  hashPassword(password: string) {
    var hash = sha256.hmac.create('key').update(password).hex();;
    return hash;
  }
  
  addUser(user:any) {
    // user.isDeleted = false;
    user.password = this.hashPassword(user.password);
    return this.http.post(this.url, user);
  }

  updateUser(user:any) {
    // user.isDeleted = false;
    // user.password = this.hashPassword(user.password);

    user.password = this.user.password;
    return this.http.put(this.url+`/${user.id}`, user)
    .pipe(map((res:any)=> {
      return res;
    }))
  }

  removeUser(user:any) {
    //* soft delete
    // user.isDeleted = true;
    // return this.http.put(this.url+`/${user.id}`, user)
    // .pipe(map((res:any)=> {
    //   return res;
    // }))
    

    //! hard delete
    return this.http.delete(this.url+`/${user.id}`)
      .pipe(map((res:any)=> {
        return res;
      }))

  }

  verifyUser(user:any) {
    // this.http.get<User>(this.url).subscribe((res:any) => {
    //   const exists = res.find((activeUser:any) => {
    //     activeUser === user
    //   });
    //   return exists;
    // })

    this.getAllUsers();
    const password = this.hashPassword(user.password);
    const exists = this.users.find((activeUser) => 
      activeUser.email === user.email && activeUser.password === password
    );

    if (exists) {
      this.setActiveUser(exists);
      this.setIsLoggedIn(true);
    }
    return exists;

  }

  setIsLoggedIn(status:boolean) {
    this.isLoggedIn = status;

    //* local storage
    if (status) {
      const jsonData = JSON.stringify(this.activeUser);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userData', jsonData);
    } else {
      localStorage.setItem('loggedIn', 'false');
      localStorage.setItem('userData', '');
    }
    
    console.log(this.getIsLoggedIn())
  }

  getIsLoggedIn() {
    // get login status from localstorage
    const status = localStorage.getItem('loggedIn');
    this.isLoggedIn = status === 'true' ? true : false;
    
    // get userdata from localstorage
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.setActiveUser(userData);
    
    return this.isLoggedIn; 
  }

  setActiveUser(user:any) {
    this.activeUser = user;
  }

  getActiveUser() {
    return this.activeUser;
  }

  // getUserLoggedIn() {
  //   const userData:User = JSON.parse(localStorage.getItem('userData') || '{}');
  //   return userData.email === "john.doe@test.com";
    
  // }

  changePassword(user:any, newPass:any) {
    user.password = this.hashPassword(newPass);
    return this.http.put(this.url+`/${user.id}`, user)
    .pipe(map((res:any)=> {
      return res;
    }));
  }

  verifyPassword(confirmPassword:any, currentPassword:any) {
    const hashConfirm = this.hashPassword(confirmPassword);

    return hashConfirm === currentPassword;
  }

}
