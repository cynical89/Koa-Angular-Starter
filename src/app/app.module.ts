import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { MdCard, MdCardContent, MdCardSubtitle, MdCardTitle } from '@angular2-material/card';
import { MdToolbar, MdToolbarRow } from '@angular2-material/toolbar';
import { MdSidenav, MdSidenavLayout } from '@angular2-material/sidenav';
import { MdList, MdListItem } from '@angular2-material/list';
import { MdButton } from '@angular2-material/button';
import { MdInput } from '@angular2-material/input';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdSpinner } from '@angular2-material/progress-circle';

import { HomeRootComponentGuard } from './home-root/home-root.guard';
import { UnauthenticatedGuard } from './unauthenticated.guard';

import { UserService } from './shared/services/user/user.service';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeRootComponent } from './home-root/home-root.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    routedComponents,
    MdCard,
    MdCardContent,
    MdInput,
    MdCardSubtitle,
    MdCardTitle,
    MdToolbar,
    MdToolbarRow,
    MdSidenav,
    MdSidenavLayout,
    MdList,
    MdListItem,
    MdButton,
    MdIcon,
    MdSpinner,
    HomeRootComponent,
    RegisterComponent,
    IndexComponent
  ],
  providers: [HomeRootComponentGuard,
              UnauthenticatedGuard,
              MdIconRegistry,
              UserService,
              {provide: 'apiBase', useValue: 'http://localhost:5000'}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
