import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor() { }

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
      position = passwordInput.getAttribute('type') === 'password' ? "301px" : "306px";
    } else {
      position = passwordInput.getAttribute('type') === 'password' ? "354px" : "359px";
    }
    const togglePasswordSpan = document.getElementById('toggle-password') as HTMLElement || null;
    togglePasswordSpan.style.marginLeft = position;
  }

}
