import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from 'src/app/interfaces/workout';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details-workout',
  templateUrl: './details-workout.component.html',
  styleUrls: ['./details-workout.component.css']
})

export class DetailsWorkoutComponent implements OnInit {

  currentWorkout: Workout | undefined;
  isLiked: boolean | undefined = false;

  get user() {
    return this.userService.user;
  }

  get isOwner(): boolean {
    return this.userService.user?._id === this.currentWorkout?.owner._id;
  }

  constructor(private workoutService: WorkoutService, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  wokroutId = this.activatedRoute.snapshot.params?.['workoutId'] // така взимам ID-то на конкретна тренировка;

  ngOnInit(): void {
    this.workoutService.getOneWorkout(this.wokroutId).subscribe({
      next: (workout) => {
        this.currentWorkout = workout;
        this.isLiked = this.like();
      },
      // error: (error) => {
      //   console.log(`Error ${error}`);
      // }
    });
  }

  deleteWorkout(): void {

    if (this.currentWorkout) {

      this.workoutService.deleteWorkout(this.wokroutId).subscribe(() => {

        this.router.navigateByUrl('/workouts/allWorouts');
        console.log('Workout deleted successfully');
      },
        (error) => {
          console.log('Error deleting workout', error);
        }
      )
    }
  }

  like(): boolean { // този метод проверява дали вече тренировкта е харесана и не показва бутона Like и го извикваме в ngOnInit;
    if (this.user && this.currentWorkout) {
      return this.currentWorkout.likes.includes(this.user._id);
    }
    return false;
  }

  onLike(): void {

    if (this.user && this.currentWorkout) {
      this.workoutService.likeWorkout(this.currentWorkout._id, this.user._id).subscribe(likedWorout => {
        this.currentWorkout = likedWorout;
        this.isLiked = true;// тук го сетвам на true за да може веднага след натискане на бутоне да се смени че вече си харесал
      },
        (error) => {
          console.log('Error liking the workout', error);
        });
    }
  }
}
