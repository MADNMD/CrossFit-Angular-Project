import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Workout } from 'src/app/interfaces/workout';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-workouts',
  templateUrl: './all-workouts.component.html',
  styleUrls: ['./all-workouts.component.css']
})
export class AllWorkoutsComponent implements OnInit {

  allWorkouts: Workout[] = [];
  searchForm: FormGroup;

  constructor(
    private workoutService: WorkoutService,
    private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      typeTraining: [''],
    })
  }

  ngOnInit(): void {
    this.workoutService.getAllWorkouts().subscribe({
      next: (workouts) => {
        this.allWorkouts = workouts;
      },
      error: (error) => {
        console.log(`Error ${error}`);
      }
    });
  }

  getAllWorkouts() {
    this.workoutService.getAllWorkouts().subscribe({
      next: (workouts) => {
        this.allWorkouts = workouts;
      },
      error: (error) => {
        console.log(`Error ${error}`);
      }
    });
  }

  search() {
    const typeTraining = this.searchForm.get('typeTraining')?.value;

    if (!typeTraining || typeTraining.trim() === '') {
      this.getAllWorkouts();
    } else {
      this.workoutService.searchWorkout(typeTraining).subscribe({
        next: (searchWorkouts) => {
          this.allWorkouts = searchWorkouts;
        },
        error: (error) => {
          console.log(`Error ${error}`);

        }
      })
    }
  }
}