import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sha256 } from 'js-sha256';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  users : User[] = [];
  user : any;
  // url = "http://localhost:3000/users"; 
  url = "https://ap-jsonserver.herokuapp.com/users";
  isLoggedIn = false;

  constructor(private http: HttpClient) { 
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
    user.isDeleted = false;
    user.password = this.hashPassword(user.password);
    return this.http.post(this.url, user);
  }

  updateUser(id: number, user:User) {
    user.isDeleted = false;
    // user.password = this.hashPassword(user.password);
    this.getUser(id);
    user.password = this.user.password;
    return this.http.put(this.url+`/${id}`, user)
    .pipe(map((res:any)=> {
      return res;
    }))
  }

  removeUser(user:User) {
    //* soft delete
    user.isDeleted = true;
    return this.http.put(this.url+`/${user.id}`, user)
    .pipe(map((res:any)=> {
      return res;
    }))
    

    //! hard delete
    // return this.http.delete(this.url+`/${id}`)
    //   .pipe(map((res:any)=> {
    //     return res;
    //   }))

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

    return exists;

  }

  setIsLoggedIn(status:boolean, userData?:User) {
    this.isLoggedIn = status;

    //* local storage
    if (status) {
      const jsonData = JSON.stringify(userData);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userData', jsonData);
    } else {
      localStorage.setItem('loggedIn', 'false');
      localStorage.setItem('userData', '');
    }
    
    console.log(this.getIsLoggedIn())
  }

  getIsLoggedIn() {
    const status = localStorage.getItem('loggedIn');

    this.isLoggedIn = status === 'true' ? true : false; 
    return this.isLoggedIn; 
  }

  getUserLoggedIn() {
    
  }

}
