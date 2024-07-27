import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../../../models/User';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  email: string = "";
  password: string = "";

  loading: boolean = false;
  userError: boolean = false;
  serverError: boolean = false;

  submitButton: HTMLButtonElement | null = document.getElementById('submit-button') as HTMLButtonElement || null

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    if (window.innerWidth <= 1200) {
      const emailInput = document.getElementById('email') as HTMLInputElement || null;
      const passwordInput = document.getElementById('password') as HTMLInputElement || null;
      emailInput.setAttribute('placeholder', "Ingresa tu correo electrónico");
      passwordInput.setAttribute('placeholder', "Ingresa tu contraseña");
    }
  }

  togglePasswordButton() {
    const passwordInput = document.getElementById('password') as HTMLInputElement || null;
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    passwordInput.focus()

    const togglePasswordImg = document.getElementById('toggle-password-img') as HTMLElement || null;
    const src = togglePasswordImg.getAttribute('src') === '../../../../../assets/img/eye-slash.png' ? '../../../../../assets/img/Shape2.png' : '../../../../../assets/img/eye-slash.png';
    togglePasswordImg.setAttribute('src', src);

    let position: string;

    if (window.innerWidth <= 1200) {
      position = passwordInput.getAttribute('type') === 'password' ? "306px" : "301px";
    } else {
      position = passwordInput.getAttribute('type') === 'password' ? "359px" : "354px";
    }
    const togglePasswordSpan = document.getElementById('toggle-password') as HTMLElement || null;
    togglePasswordSpan.style.marginLeft = position;
  }

  onSubmit() {
    this.loading = true;
    this.userError = false;
    this.serverError = false;
    if (this.submitButton) {
      this.submitButton.disabled = true;
    }

    this.authService.login({
      "email": this.email,
      "password": this.password
    }).subscribe(res => {
      this.loading = false
      this.cookieService.set('id', res.id.toString(), { expires: 1, path: '/'})
      this.cookieService.set('email', res.email, { expires: 1, path: '/'});
      this.cookieService.set('name', res.name, { expires: 1, path: '/'});
      this.cookieService.set('surname', res.surname, { expires: 1, path: '/'});

      this.router.navigate(['/dashboard']);
    }, err => {
      this.loading = false
      console.error(err);
      if (err.status == 401) {
        this.userError = true;
      } else {
        this.serverError = true;
      }
    });
  }

}
