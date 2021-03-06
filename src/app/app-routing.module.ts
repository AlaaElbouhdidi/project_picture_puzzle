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
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'module-puzzles',
    loadChildren: () => import('./module/module-puzzles/module-puzzles.module').then( m => m.ModulePuzzlesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'module-list',
    loadChildren: () => import('./module/module-list/module-list.module').then(m => m.ModuleListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'module-learn',
    loadChildren: () => import('./module/module-learn/module-learn.module').then( m => m.ModuleLearnPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'module-picker',
    loadChildren: () => import('./module/module-picker/module-picker.module').then( m => m.ModulePickerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'achievement-page',
    loadChildren: () => import('./achievement/achievement-page/achievement-page.module').then( m => m.AchievementPagePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'statistic-page',
    loadChildren: () => import('./statistic/statistic-page/statistic-page.module').then( m => m.StatisticPagePageModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
