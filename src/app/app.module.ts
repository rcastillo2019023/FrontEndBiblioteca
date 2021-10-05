
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BookComponent } from './components/book/book.component';
import { MagazineComponent } from './components/magazine/magazine.component';
import { ListmagazineComponent } from './components/listmagazine/listmagazine.component';
import { ListbookComponent } from './components/listbook/listbook.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { MyloansComponent } from './components/myloans/myloans.component';
import { BarrComponent } from './components/barr/barr.component';
import { AdminsComponent } from './components/admins/admins.component';
import { LibrariansComponent } from './components/librarians/librarians.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ChartsModule } from '@rinminase/ng-charts';
import { ReportbookComponent } from './components/reportbook/reportbook.component';
import { ReportmagazineComponent } from './components/reportmagazine/reportmagazine.component';
import { ReportuserComponent } from './components/reportuser/reportuser.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BookComponent,
    MagazineComponent,
    ListmagazineComponent,
    ListbookComponent,
    ProfileComponent,
    UsersComponent,
    MyloansComponent,
    BarrComponent,
    AdminsComponent,
    LibrariansComponent,
    ReportbookComponent,
    ReportmagazineComponent,
    ReportuserComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    ChartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
