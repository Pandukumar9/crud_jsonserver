import { Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './pages/employee-dashboard/employee-dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {path:'' , redirectTo:'dashboard', pathMatch:"full"},
  {path: 'dashboard' , component : EmployeeDashboardComponent},
   { path: '**' , component:PageNotFoundComponent}
];
