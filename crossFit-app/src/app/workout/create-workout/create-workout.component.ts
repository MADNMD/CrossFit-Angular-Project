import { Component } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css']
})
export class CreateWorkoutComponent {

  get user(): User | null {
    return this.userService.user;

  }

  constructor(
    private formBuilder: FormBuilder,
    private workoutService: WorkoutService,
    private router: Router,
    private userService: UserService) { }

  createForm: FormGroup = this.formBuilder.group({
    difficultyLevel: new FormControl('', [Validators.required,]),
    typeTraining: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required, Validators.pattern('^(http|https)://.+')]),
    trainingDuration: new FormControl('', [Validators.required]),
    exercises: new FormControl('', [Validators.required]),
  });

  createWorkout(): void {

    if (this.createForm.invalid) {
      return;
    }

    const { difficultyLevel, typeTraining, image, trainingDuration, exercises } = this.createForm.value;
    const owner: User | null = this.user;
    // console.log(owner)
    if (owner) {
      const likes: string[] = [];
      this.workoutService.createWorkout(difficultyLevel, typeTraining, image, trainingDuration, exercises, likes, owner).subscribe(() => {
        this.router.navigateByUrl('/workouts/allWorouts');
        this.createForm.reset();
      });
    }
  }
}