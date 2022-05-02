import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthguardGuard} from "./shared/services/authguard.guard";

const routes: Routes = [
  {path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule), canActivate: [AuthguardGuard]},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'help', loadChildren: () => import('./pages/comment/comment.module').then(m => m.CommentModule), canActivate: [AuthguardGuard]},
  {path: 'forum', loadChildren: () => import('./pages/forum/forum.module').then(m => m.ForumModule), canActivate: [AuthguardGuard]},
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  {path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)},
  {path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)},
  {path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
