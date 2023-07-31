import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  userProfile: User | undefined;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.updateUserProfile();
  }

  updateUserProfile(): void {
    this.userService.getUser().subscribe({
      next: (currentUser) => {
        this.userProfile = currentUser;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteProfile(): void {

    if (this.userProfile) {

      const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
        data: {
          title: 'Delete this profile',
          message: 'Are you sure you want to delete this profile?'
        }
      });

      dialogRef.afterClosed().subscribe((result) => {

        if (result) {

          this.userService.deleteUser(this.userProfile?._id!).pipe(
            switchMap(() => this.userService.logoutUser()) //switchMap първо ще изпълни извикването deleteUser и след това ще превключи към извикването logoutUser;
          ).subscribe(() => { // и по този начин избягвам нестнатите subscribers;
            this.userProfile = undefined;
            this.router.navigateByUrl('/auth/register');
            console.log('Profile delete successfully');
          },
            (error) => {
              console.log('Error deleting profile', error);
            });
        }
      });
    }
  }
}

   // const shouldDelete = window.confirm('Are you sure you want to delete your profile?');

      // if (shouldDelete) {

      // this.userService.deleteUser(this.userProfile?._id).pipe(
      //   switchMap(() => this.userService.logoutUser()) //switchMap първо ще изпълни извикването deleteUser и след това ще превключи към извикването logoutUser;
      // ).subscribe(() => { // и по този начин избягвам нестнатите subscribers;
      //   this.userProfile = undefined;
      //   this.router.navigateByUrl('/auth/register');
      //   console.log('Profile delete successfully');
      // },
      //   (error) => {
      //     console.log('Error deleting profile', error);
      //   })
    // }


