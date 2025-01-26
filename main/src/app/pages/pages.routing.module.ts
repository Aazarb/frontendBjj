import {Routes} from '@angular/router';
import {AppDashboardComponent} from './dashboard/dashboard.component';
import {authGuard} from "../guards/auth.guard";
import {ForbiddenComponent} from "./forbidden/forbidden.component";

export const PagesRoutes: Routes = [

  {
    path: 'dashboard',
    component: AppDashboardComponent,
    canActivate: [authGuard],
    data: {role: 'admin'},
  },
  {
    path: 'home',
    component: AppDashboardComponent,
    canActivate: [authGuard],
    data: {role: 'member'},
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent}
];
