import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAddComponent } from './Components/Pages/Student/student-add/student-add.component'
import { StudentListComponent } from './Components/Pages/Student/student-list/student-list.component'

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent
  },
  {
    path: 'student',
    component: StudentListComponent
  },
  {
    path: 'student/create',
    component: StudentAddComponent
  },
  {
    path: 'student/edit/:id',
    component: StudentAddComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
