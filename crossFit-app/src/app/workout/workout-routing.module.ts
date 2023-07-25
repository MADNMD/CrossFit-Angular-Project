import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { AllWorkoutsComponent } from './all-workouts/all-workouts.component';
import { DetailsWorkoutComponent } from './details-workout/details-workout.component';
import { EditWorkoutComponent } from './edit-workout/edit-workout.component';
import { AuthActivate } from '../core/guards/auth.activate';
import { MyWorkoutsComponent } from './my-workouts/my-workouts.component';

const routes: Routes = [
    {
        path: 'create',
        component: CreateWorkoutComponent,
        canActivate: [AuthActivate],
    },
    {
        path: 'allWorouts',
        component: AllWorkoutsComponent,
    },
    {
        path: 'details/:workoutId',
        component: DetailsWorkoutComponent,
    },
    {
        path: 'edit/:workoutId',
        component: EditWorkoutComponent,
        canActivate: [AuthActivate,]
    },
    {
        path: 'my-workouts',
        component: MyWorkoutsComponent,
        canActivate: [AuthActivate],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkoutRoutingModule { }



// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { CreateWorkoutComponent } from './create-workout/create-workout.component';
// import { AllWorkoutsComponent } from './all-workouts/all-workouts.component';
// import { DetailsWorkoutComponent } from './details-workout/details-workout.component';
// import { EditWorkoutComponent } from './edit-workout/edit-workout.component';
// import { AuthActivate } from '../core/guards/auth.activate';
// import { MyWorkoutsComponent } from './my-workouts/my-workouts.component';

// const routes: Routes = [
//     {
//         path: 'workouts',
//         children: [
//             {
//                 path: 'create',
//                 component: CreateWorkoutComponent,
//                 canActivate: [AuthActivate],
//             },
//             {
//                 path: 'allWorouts',
//                 component: AllWorkoutsComponent,
//             },
//             {
//                 path: 'details/:workoutId',
//                 component: DetailsWorkoutComponent,
//             },
//             {
//                 path: 'edit/:workoutId',
//                 component: EditWorkoutComponent,
//                 canActivate: [AuthActivate,]
//             },
//             {
//                 path: 'my-workouts',
//                 component: MyWorkoutsComponent,
//                 canActivate: [AuthActivate],
//             }
//         ]
//     }
// ];

// @NgModule({
//     imports: [RouterModule.forChild(routes)],
//     exports: [RouterModule]
// })
// export class WorkoutRoutingModule { }