import { HomeRootComponent } from './home-root.component';
import { HomeRootComponentGuard } from './home-root.guard';
import { LogoutComponent } from './logout/logout.component';

export const HomeRootRoutes = [
  {
    path: 'home',
    component: HomeRootComponent,
    canActivate: [HomeRootComponentGuard],
    children: [
      { path: 'logout', component: LogoutComponent }
    ]
  }
];
