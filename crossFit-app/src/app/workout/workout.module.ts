import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllWorkoutsComponent } from './all-workouts/all-workouts.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';



@NgModule({
  declarations: [
    AllWorkoutsComponent,
    CreateWorkoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WorkoutModule { }
