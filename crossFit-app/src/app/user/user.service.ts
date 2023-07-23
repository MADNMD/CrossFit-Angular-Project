import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject, Subscription, catchError, tap, throwError } from 'rxjs';

const apiURL = environment.appUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  private user$$ = new BehaviorSubject<User | null>(null);
  user$ = this.user$$.asObservable();

  user: User | null = null;

  get isLogged() {
    return !!this.user;
  }

  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.user$.pipe().subscribe(user => this.user = user);
  }

  registerUser(username: string, email: string, password: string) {
    return this.http.post<User>(`${apiURL}/users/register`, { username, email, password }).pipe(
      tap((user: User) => { //С включването на tap в pipe-а, той гарантира, че редът isAuthenticated.next(true) се изпълнява само след успешна регистрация.
        this.user$$.next(user);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error.message);
      })
    )
  }

  loginUser(email: string, password: string) {
    return this.http.post<User>(`${apiURL}/users/login`, { email, password }).pipe(
      tap((user: User) => {
        this.user$$.next(user);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(error.message);
      })
    )
  }

  logoutUser() {
    return this.http.get<User>(`${apiURL}/users/logout`).pipe(
      tap(() => {
        this.user$$.next(null);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(error.message);
      })
    )
  }

  getUser() {
    return this.http.get<User>(`${apiURL}/users/user`).pipe(
      tap((user) => {
        this.user$$.next(user);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}