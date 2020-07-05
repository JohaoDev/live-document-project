import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const postUser_API = environment.API_URL + 'user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  createUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._createUserForm();
  }

  _createUserForm = () => {
    this.createUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  };

  _create = () => {
    let name = this.createUserForm.get('name').value;
    let lastname = this.createUserForm.get('lastname').value;
    let age = this.createUserForm.get('age').value;
    let email = this.createUserForm.get('email').value;
    let password = this.createUserForm.get('password').value;

    if (this.createUserForm.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Fill all the gaps to continue',
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      let userData = {
        user: {
          name,
          lastname,
          age,
          email,
          password,
          rol: 'Client',
        },
      };

      this.http.post(`${postUser_API}`, userData).subscribe((data: any) => {
        if (data.ok) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Created',
            showConfirmButton: false,
            timer: 2000,
          });
          this.router.navigate(['/menu']);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Something went wrong, try again later',
            showConfirmButton: true,
          });
        }
      });
    }
  };
}
