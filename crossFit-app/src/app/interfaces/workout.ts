import { User } from "./user";

export interface Workout {
    difficultyLevel: string,
    typeTraining: string,
    image: string,
    trainingDuration: string,
    exercises: string,
    likes: string[],
    owner: User,
    _id: string,
    __v: number,
}