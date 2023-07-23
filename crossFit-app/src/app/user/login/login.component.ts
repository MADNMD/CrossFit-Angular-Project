import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,) { }

  loginForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  loginUser(): void {

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.userService.loginUser(email, password).subscribe(() => {
      this.router.navigateByUrl('/workouts/allWorouts');
      this.loginForm.reset();
    },
      (error) => {
        console.log(error);
      }
    )
  }
}