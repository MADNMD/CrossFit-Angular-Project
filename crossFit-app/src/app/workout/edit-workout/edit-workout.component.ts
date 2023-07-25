import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutService } from '../workout.service';
import { Workout } from 'src/app/interfaces/workout';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css']
})
export class EditWorkoutComponent implements OnInit {

  currentWorkout: Workout | undefined;

  constructor(
    private workoutService: WorkoutService, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute) { }

  editForm: FormGroup = this.formBuilder.group({
    difficultyLevel: new FormControl('', [Validators.required,]),
    typeTraining: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required, Validators.pattern('^(http|https)://.+')]),
    trainingDuration: new FormControl('', [Validators.required]),
    exercises: new FormControl('', [Validators.required]),
  })

  workoutId = this.activatedRoute.snapshot.params?.['workoutId'];

  ngOnInit(): void {
    
    this.workoutService.getOneWorkout(this.workoutId).subscribe((workout) => {
      this.currentWorkout = workout;

      this.editForm.patchValue({
        difficultyLevel: this.currentWorkout.difficultyLevel,
        typeTraining: this.currentWorkout.typeTraining,
        image: this.currentWorkout.image,
        trainingDuration: this.currentWorkout.trainingDuration,
        exercises: this.currentWorkout.exercises
      })
    })
  }

  editWorkout(): void {

    this.workoutService.editWorkout(this.workoutId, this.editForm.value.difficultyLevel, this.editForm.value.typeTraining, this.editForm.value.image, this.editForm.value.trainingDuration, this.editForm.value.exercises,).subscribe(() => {
      this.router.navigateByUrl(`/workouts/details/${this.workoutId}`);
    })
  }
}
