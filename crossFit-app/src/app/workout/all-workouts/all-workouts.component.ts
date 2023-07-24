import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Workout } from 'src/app/interfaces/workout';

@Component({
  selector: 'app-all-workouts',
  templateUrl: './all-workouts.component.html',
  styleUrls: ['./all-workouts.component.css']
})
export class AllWorkoutsComponent implements OnInit{

  allWorkouts: Workout[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getAllWorkouts().subscribe({
      next: (workouts) => {
        // console.log(workouts)
        this.allWorkouts = workouts;
      },
      // error: (error) => {
      //   console.log(`Error ${error}`);
      // }
    });
  }

}