import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeRootComponent } from './home-root/home-root.component';

import { HomeRootRoutes } from './home-root/home-root.routes';
import { HomeRootComponentGuard } from './home-root/home-root.guard';
import { UnauthenticatedGuard } from './unauthenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UnauthenticatedGuard]
  },
  ...HomeRootRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [HomeRootComponent, IndexComponent, LoginComponent, RegisterComponent];
