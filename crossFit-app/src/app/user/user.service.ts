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

  private isAuthenticated = new Subject<boolean>(); // излъчва промени в статуса на удостоверяване,
  authStatusChanged = this.isAuthenticated.asObservable(); //това e observable представяне на този subject, което позволява на абонатите да наблюдават промените в статуса на удостоверяване без директен достъп до subject-a.

  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  user: User | null = null;

  subscription: Subscription;

  constructor(private http: HttpClient) {
    // this.subscription = new Subscription;
    this.subscription = this.user$.pipe().subscribe(user => this.user = user);
  }

  // ngOnInit(): void {
  //   // this.subscription = this.user$.subscribe(user => this.user = user); 
  // }

  registerUser(username: string, email: string, password: string) {
    return this.http.post<User>(`${apiURL}/users/register`, { username, email, password }).pipe(
      tap((user: User) => { //С включването на tap в pipe-а, той гарантира, че редът isAuthenticated.next(true) се изпълнява само след успешна регистрация.
        this.setUser(user);
        this.isAuthenticated.next(true);
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
        this.setUser(user);
        this.isAuthenticated.next(true);
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
        this.setUser(null);
        this.isAuthenticated.next(false);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(error.message);
      })
    )
  }

  private setUser(user: User | null): void {
    // console.log(user);
    this.userSubject.next(user);//актуализира стойността userSubject с предоставения потребител или нула.
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
    this.userSubject.complete();
  }
}