import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForbiddenComponent} from "./pages/forbidden/forbidden.component";
import {BlankComponent} from "./layouts/blank/blank.component";
import {authGuard} from "./guards/auth.guard";
import {WelcomeComponent} from "./pages/welcome/welcome.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: '',
    component: BlankComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
        data: { role: 'admin' },
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
        data: { role: 'member' },
      }
    ],
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./pages/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', redirectTo: 'welcome' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
