import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { UserService } from "src/app/user/user.service";

@Injectable({
    providedIn: 'root'
})

export class AuthActivate implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }
    // Този клас AuthActivate отиваме и го слагаме в рутера на User така canActivate: [AuthActivate] и в theme модула на addTheme също го добавяме;
    canActivate(): boolean | UrlTree {

        if (!this.userService.isLogged) {
            console.log(!this.userService.isLogged, 'true');
            return true;
        } else {
            console.log(!this.userService.isLogged, 'false');
            const loginUrlTree: UrlTree = this.router.parseUrl('/auth/login');
            return loginUrlTree
        }
    }

}