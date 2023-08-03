import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Router } from '@angular/router';
import { Workout } from 'src/app/interfaces/workout';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.css']
})
export class MyWorkoutsComponent implements OnInit {

  myWorkouts: Workout[] = [];
  userId: string = '';

  currentPage = 1;
  totalPages = 1;

  constructor(
    private workoutService: WorkoutService,
    private userService: UserService) { }


  ngOnInit(): void {

    if (this.userService.user) {
      this.userId = this.userService.user._id;
      this.paginationMyWorkouts();
    }
  }

  paginationMyWorkouts() {

    this.workoutService.myWorkouts(this.userId, this.currentPage).subscribe({
      next: (data) => {
          this.myWorkouts = data.workouts;
          this.totalPages = data.totalPage; 
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginationMyWorkouts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginationMyWorkouts();
    }
  }

}
