import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const login_API = environment.API_URL + 'login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._loginForm();
  }

  _loginForm = () => {
    this.loginForm = this.formBuilder.group({
      email: ['johao@gmail.com', [Validators.required]],
      password: ['1234', [Validators.required]],
    });
  };

  _signIn = () => {
    let email = this.loginForm.get('email').value,
      password = this.loginForm.get('password').value;

    if (this.loginForm.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Fill all the gaps to continue',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      let signInData = {
        data: {
          email,
          password,
        },
      };

      this.http.post(login_API, signInData).subscribe((data: any) => {
        data.ok
          ? (sessionStorage.setItem('token', data.token),
            this.router.navigate(['/menu']))
          : Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Incorrect data',
              showConfirmButton: false,
              timer: 1500,
            });
      });
    }
  };
}
