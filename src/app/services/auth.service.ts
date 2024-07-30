import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../models/RegisterForm';
import { LoginForm } from '../models/LoginForm';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // uri: string = "http://localhost:8080/user";
  uri: string = "https://techforb-java.onrender.com/user";

  constructor(private http: HttpClient) { }

  register(req: RegisterForm) {
    return this.http.post(this.uri + "", req);
  }

  edit(id: number, userDetails: RegisterForm) {
    return this.http.put(this.uri + "", userDetails);
  }

  login(loginForm: LoginForm) {
    return this.http.post<User>(this.uri + "/login", loginForm)
  }

  logout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("Username");
    localStorage.removeItem("Admin");
  }
}
