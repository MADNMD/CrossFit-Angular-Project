import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllWorkoutsComponent } from './all-workouts/all-workouts.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { DetailsWorkoutComponent } from './details-workout/details-workout.component';
import { EditWorkoutComponent } from './edit-workout/edit-workout.component';
import { MyWorkoutsComponent } from './my-workouts/my-workouts.component';



@NgModule({
  declarations: [
    AllWorkoutsComponent,
    CreateWorkoutComponent,
    DetailsWorkoutComponent,
    EditWorkoutComponent,
    MyWorkoutsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WorkoutModule { }
