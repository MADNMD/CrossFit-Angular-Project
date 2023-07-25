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
  userId: string = '';;

  constructor(
    private workoutService: WorkoutService,
    private userService: UserService) { }

  ngOnInit(): void {

    if (this.userService.user) {
      this.userId = this.userService.user._id;
    }
    // console.log(this.userService.user);
    
    this.workoutService.myWorkouts(this.userId).subscribe({
      next: (workouts) => {
        // console.log(workouts);
        this.myWorkouts = workouts;
      },
      // error: (error) => {
      //   console.log(`Error ${error}`);

      // }
    })

  }

}
