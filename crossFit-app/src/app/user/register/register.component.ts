import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { appEmailvalidator } from 'src/app/shared/validators/app-email.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  registerForm: FormGroup = this.formBuilder.group({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    // email: new FormControl('', [Validators.required, appEmailvalidator()]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    repeatPassword: new FormControl('', [Validators.required]),
  })

  registerUser(): void {

    if (this.registerForm.invalid) {
      return;
    }

    const { username, email, password } = this.registerForm.value;
    this.userService.registerUser(username, email, password).subscribe(() => {
      this.router.navigateByUrl('/workouts/allWorouts');
      this.registerForm.reset();
    },
      // (error) => {
      //   console.error(error);
      // }
    )
  }

  comparePasswords(): boolean {
    return this.registerForm.value.password === this.registerForm.value.repeatPassword;
  }
}