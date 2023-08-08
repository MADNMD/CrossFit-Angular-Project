import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/user/user.service";

@Injectable({
    providedIn: 'root'
})

export class AuthPrevent implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router) { }

    canActivate(): boolean | UrlTree {
        if (!this.userService.isLogged) {
            return true;
        } else {
            const homeUrlTree: UrlTree = this.router.parseUrl('/home');
            return homeUrlTree;
        }
    }
}