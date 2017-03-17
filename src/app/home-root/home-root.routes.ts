import { HomeRootComponent } from './home-root.component';
import { HomeRootComponentGuard } from './home-root.guard';
// import { UsersComponent } from '../users/users.component';
// import { HeroesComponent } from '../heroes/heroes.component';
// import { HeroDetailComponent } from '../hero-detail/hero-detail.component';

export const HomeRootRoutes = [
  {
    path: '',
    component: HomeRootComponent,
    canActivate: [HomeRootComponentGuard],
    children: [
      // { path: '', component: UsersComponent },
      // { path: 'heroes', component: HeroesComponent },
      // { path: 'detail', component: HeroDetailComponent }
    ]
  }
];
