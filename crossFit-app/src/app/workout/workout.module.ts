import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { WorkoutRoutingModule } from './workout-routing.module';
import { RouterModule } from '@angular/router';
import { AllWorkoutsComponent } from './all-workouts/all-workouts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsWorkoutComponent } from './details-workout/details-workout.component';
import { EditWorkoutComponent } from './edit-workout/edit-workout.component';
import { MyWorkoutsComponent } from './my-workouts/my-workouts.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';

@NgModule({
  declarations: [
    CreateWorkoutComponent,
    AllWorkoutsComponent,
    DetailsWorkoutComponent,
    EditWorkoutComponent,
    MyWorkoutsComponent,
    DeleteConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    WorkoutRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [
    CreateWorkoutComponent,
    AllWorkoutsComponent,
    DetailsWorkoutComponent,
    EditWorkoutComponent,
    MyWorkoutsComponent,
    DeleteConfirmationDialogComponent,
  ]
})
export class WorkoutModule { }
