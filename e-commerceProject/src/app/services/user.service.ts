import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogIn } from '../interface/logIn-interface';
import { SignUp } from '../interface/signup-interface';

@Injectable({
  providedIn: 'root',
})
// return this.http.post(`${this.apiUrl}/product`, data)
export class UserService {
  // private backendApiUrl = `${environment.apiUrl}/api`;
  private apiUrl = 'http://localhost:3005/api';
  userApiUrl = 'http://localhost:3000';
  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
    ),
    // withCredentials: true
    // observe: 'response' as 'response'
  };
  private header = new HttpHeaders().set('Content-Type', 'application/json');
  userSignUp(user:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/userDataStore`, user);
  }
  userLogIn(user: any){
    return this.http.post(`${this.apiUrl}/authCheck`, user, {observe: "body"}).subscribe((res) => {
      // if (res && res.?.length) {
        let token = JSON.stringify(res)
              this.invalidUserAuth.emit(false);
              // localStorage.setItem('token', token )
              localStorage.setItem('user', JSON.stringify(res));
              this.router.navigate(['/']);
    })
    // return this.http
    //   .get<SignUp[]>(
    //     `${this.userApiUrl}/user?email=${user.email}&password=${user.password}`,
    //     { observe: 'response' }
    //   )
    //   .subscribe((data) => {
    //     if (data && data.body?.length) {
    //       this.invalidUserAuth.emit(false);
    //       localStorage.setItem('user', JSON.stringify(data.body[0]));
    //       this.router.navigate(['/']);
    //     } else {
    //       this.invalidUserAuth.emit(true);
    //     }
    //   });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
  // userLogIn(user: LogIn) {
  //   return this.http
  //     .get<SignUp[]>(
  //       `${this.userApiUrl}/user?email=${user.email}&password=${user.password}`,
  //       { observe: 'response' }
  //     )
  //     .subscribe((data) => {
  //       if (data && data.body?.length) {
  //         this.invalidUserAuth.emit(false);
  //         localStorage.setItem('user', JSON.stringify(data.body[0]));
  //         this.router.navigate(['/']);
  //       } else {
  //         this.invalidUserAuth.emit(true);
  //       }
  //     });
  // }
}
