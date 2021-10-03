import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private message: NzMessageService
  ) {}

  loginFail() {
    this.message.error('Invalid username or password!');
  }
  loginSuccess() {
    this.message.success('Login success!');
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.loading = true;
      this.authService
        .login(
          this.validateForm.value.userName,
          this.validateForm.value.password
        )
        .subscribe(
          (res) => {
            window.localStorage.setItem(
              'token',
              JSON.stringify(res.accessToken)
            );
            this.router.navigate(['/admin/welcome']);
            this.loginSuccess();
          },
          (error) => {
            this.loginFail();
            this.loading = false;
          }
        );
    }
  }
}
