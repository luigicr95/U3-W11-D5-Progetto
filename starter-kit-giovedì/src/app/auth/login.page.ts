import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Component({
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit()">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="email"
          ngModel
          name="email"
          class="form-control"
          id="email"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          ngModel
          name="password"
          class="form-control"
          id="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <h3 *ngIf="error">{{ error }}</h3>
  `,
  styles: [],
})
export class LoginPage implements OnInit {
  @ViewChild('f') form!: NgForm;
  error = undefined;
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    //console.log(this.form.value)
    this.authService.signin(this.form.value).subscribe(
      (data) => {
        console.log(data),
          (this.error = undefined),
          localStorage.setItem('userLogin', JSON.stringify(data)),
          this.router.navigate(['/home]']);
      },
      (err) => {
        console.log(err);
        this.error = err.error;
      }
    );
  }
}
