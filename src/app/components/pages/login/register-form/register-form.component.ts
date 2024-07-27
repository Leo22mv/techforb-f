import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  email: string = "";
  password: string = "";
  name: string = "";
  surname: string = "";

  loading: boolean = false;
  userError: boolean = false;
  serverError: boolean = false;

  submitButton: HTMLButtonElement | null = document.getElementById('submit-button') as HTMLButtonElement || null

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (window.innerWidth <= 1200) {
      const emailInput = document.getElementById('email') as HTMLInputElement || null;
      const passwordInput = document.getElementById('password') as HTMLInputElement || null;
      const nameInput = document.getElementById('name') as HTMLInputElement || null;
      const surnameInput = document.getElementById('surname') as HTMLInputElement || null;
      emailInput.setAttribute('placeholder', "Ingresar un correo electrónico");
      passwordInput.setAttribute('placeholder', "Ingresa una contraseña");
      nameInput.setAttribute('placeholder', "Ingresa tu nombre");
      surnameInput.setAttribute('placeholder', "Ingresa tu apellido");
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

    this.authService.register({
      "email": this.email,
      "password": this.password,
      "name": this.name,
      "surname": this.surname
    }).subscribe(res => {
      this.loading = false
      this.router.navigate(['/auth/login']);
    }, err => {
      this.loading = false
      console.error(err);
      if (err.status == 400) {
        this.userError = true;
      } else {
        this.serverError = true;
      }
    });
  }

}
