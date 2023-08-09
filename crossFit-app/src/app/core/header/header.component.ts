import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { ErrorMessageService, MessageType } from '../error-message.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    get isLoggedIn(): boolean {
        return this.userService.isLogged
    }

    message: string | null = null;
    isMessageError: boolean | null = null;

    private subscription!: Subscription;

    constructor(
        private userService: UserService,
        private router: Router,
        private errorMessageService: ErrorMessageService) { }

    logoutUser(): void {
        this.userService.logoutUser().subscribe({
            next: () => {
                console.log(this.userService.user)
                this.router.navigateByUrl('/auth/login');
            },
            error: () => {
                this.router.navigateByUrl('/auth/login');
            }
        })
    }

    ngOnInit(): void {
        this.subscription = this.errorMessageService.onNewMessage$.subscribe((message) => {
            this.message = message.text;
            this.isMessageError = message.type === MessageType.Error;

            if (this.message && this.isMessageError) {
                setTimeout(() => {
                    this.message = null;
                    this.isMessageError = null
                }, 3000);
            }
        })
    }
}