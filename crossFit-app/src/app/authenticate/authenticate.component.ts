import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  isAuthenticated = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUser().subscribe({
      next: () => { this.isAuthenticated = true },
      error: () => { this.isAuthenticated = false },
    })
  }

}
