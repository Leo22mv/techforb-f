import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { LoginForm } from '../models/LoginForm';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri: string = "http://localhost:8080/user";

  constructor(private http: HttpClient) { }

  register(req: User) {
    return this.http.post(this.uri + "", req);
  }

  edit(id: number, userDetails: User) {
    return this.http.put(this.uri + "", userDetails);
  }

  login(loginForm: LoginForm) {
    return this.http.post(this.uri + "/login", loginForm)
  }

  logout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("Username");
    localStorage.removeItem("Admin");
  }
}
