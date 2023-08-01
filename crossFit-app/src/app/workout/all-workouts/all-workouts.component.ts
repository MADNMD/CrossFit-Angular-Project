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

  currentPage = 1;
  totalPages = 1;

  constructor(
    private workoutService: WorkoutService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      typeTraining: [''],
    })
  }

  ngOnInit(): void {
    this.paginatedWokrouts();
  }

  paginatedWokrouts() {
    this.workoutService.getAllWorkouts(this.currentPage).subscribe({
      next: (data) => {
        this.allWorkouts = data.workouts;
        this.totalPages = data.totalPage;
      },
      error: (error) => {
        console.log(`Error ${error}`);
      },
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginatedWokrouts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatedWokrouts();
    }
  }

  search() {
    const typeTraining = this.searchForm.get('typeTraining')?.value;

    if (!typeTraining || typeTraining.trim() === '') {
      this.paginatedWokrouts();
    } else {
      this.workoutService.searchWorkout(typeTraining).subscribe({
        next: (searchWorkouts) => {
          this.allWorkouts = searchWorkouts;
          this.currentPage = 1;
          this.totalPages = 1;
        },
        error: (error) => {
          console.log(`Error ${error}`);

        }
      })
    }
  }
}