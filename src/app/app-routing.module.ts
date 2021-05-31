import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'user-login',
    pathMatch: 'full'
  },
  {
    path: 'user-login',
    loadChildren: () => import('./user/user-login/user-login.module').then( m => m.UserLoginPageModule)
  },
  {
    path: 'user-register',
    loadChildren: () => import('./user/user-register/user-register.module').then( m => m.UserRegisterPageModule)
  },
  {
    path: 'module-puzzles',
    loadChildren: () => import('./module/module-puzzles/module-puzzles.module').then( m => m.ModulePuzzlesPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
