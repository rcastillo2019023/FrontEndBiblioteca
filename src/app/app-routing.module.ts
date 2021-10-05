import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './components/admins/admins.component';
import { BarrComponent } from './components/barr/barr.component';
import { BookComponent } from './components/book/book.component';
import { HomeComponent } from './components/home/home.component';
import { LibrariansComponent } from './components/librarians/librarians.component';
import { ListbookComponent } from './components/listbook/listbook.component';
import { ListmagazineComponent } from './components/listmagazine/listmagazine.component';
import { LoginComponent } from './components/login/login.component';
import { MagazineComponent } from './components/magazine/magazine.component';
import { MyloansComponent } from './components/myloans/myloans.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportbookComponent } from './components/reportbook/reportbook.component';
import { ReportmagazineComponent } from './components/reportmagazine/reportmagazine.component';
import { ReportuserComponent } from './components/reportuser/reportuser.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  { path: 'barr', component: BarrComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile/:idUser', component: ProfileComponent},
  { path: 'book', component: BookComponent},
  { path: 'magazine', component: MagazineComponent},
  { path: 'listbook', component: ListbookComponent},
  { path: 'listmagazine', component: ListmagazineComponent},
  { path: 'users', component: UsersComponent},
  { path: 'myloans', component: MyloansComponent},
  { path: 'home', component: HomeComponent},
  { path: 'admins', component: AdminsComponent},
  { path: 'librarians', component: LibrariansComponent},
  { path: 'reportBook', component: ReportbookComponent},
  { path: 'reportMagazine', component: ReportmagazineComponent},
  { path: 'reportUser', component: ReportuserComponent},
  
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
