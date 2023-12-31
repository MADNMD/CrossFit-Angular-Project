import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { appEmailvalidator } from 'src/app/shared/validators/app-email.validator';
import { ErrorMessageService, MessageType } from 'src/app/core/error-message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  user: User | undefined;

  message: string | null = null;
  isMessageError: boolean | null = null;

  private subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private errorMessageService: ErrorMessageService,
    private router: Router) { }

  editUser: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.,!-_]+@[a-zA-Z]+\.[a-zA-Z]{2,}$')]],
    // email: ['', [Validators.required, appEmailvalidator()]],
  })

  ngOnInit(): void {

    this.subscription = this.errorMessageService.onNewMessage$.subscribe((message) => {
      this.message = message.text;
      this.isMessageError = message.type === MessageType.Error;

      if (this.message && this.isMessageError) {
        setTimeout(() => {
          this.message = null;
          this.isMessageError = null;
        }, 3000);
      }
    });

    if (this.userService.user) {
      this.user = this.userService.user;
    }

    this.editUser.patchValue({
      username: this.user?.username,
      email: this.user?.email,
    })

  }

  onEditUser(): void {

    if (this.editUser.invalid) {
      return;
    }

    const { username, email } = this.editUser.value;

    if (this.user) {
      this.userService.editUser(this.user?._id, username, email).subscribe(() => {
        this.router.navigateByUrl('/auth/profile')
      },
        (error) => {
          console.error('Error editing user:', error);
        })
    }

  }

  ngOnDestroy(): void {

    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
