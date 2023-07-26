import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Workout } from '../interfaces/workout';
import { User } from '../interfaces/user';

const apiURL = environment.appUrl;

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  getAllWorkouts() {
    return this.http.get<Workout[]>(`${apiURL}/workouts/allWorouts`);
  }

  createWorkout(difficultyLevel: string, typeTraining: string, image: string, trainingDuration: string, exercises: string, likes: string[], owner: User) {
    return this.http.post<Workout>(`${apiURL}/workouts/createWorkout`, { difficultyLevel, typeTraining, image, trainingDuration, exercises, likes, owner });
  }

  getOneWorkout(wokroutId: string) {
    return this.http.get<Workout>(`${apiURL}/workouts/details/${wokroutId}`);
  }

  editWorkout(workoutId: string, difficultyLevel: string, typeTraining: string, image: string, trainingDuration: string, exercises: string,) {
    return this.http.put<Workout>(`${apiURL}/workouts/edit/${workoutId}`, { difficultyLevel, typeTraining, image, trainingDuration, exercises })
  }

  deleteWorkout(workoutId: string) {
    return this.http.delete<Workout>(`${apiURL}/workouts/delete/${workoutId}`);
  }

  myWorkouts(userId: string) {
    return this.http.get<Workout[]>(`${apiURL}/workouts/myWorkouts/${userId}`);
  }

  likeWorkout(workoutId: string, userId: string) {
    return this.http.post<Workout>(`${apiURL}/workouts/like/${workoutId}`, { userId });
  }

  unLikeWorkout(workoutId: string, userId: string) {
    return this.http.post<Workout>(`${apiURL}/workouts/unlike/${workoutId}`, { userId });
  }

}