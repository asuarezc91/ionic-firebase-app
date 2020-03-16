import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppURl } from '../config/app-urls.config';
import { SecureInnerPagesGuard } from '../share/guard/secure-inner-pages.guard';
import { AuthGuard } from '../share/guard/auth.guard';

const routes: Routes = [
  { path: AppURl.AppRoot, redirectTo: AppURl.AppHome, pathMatch: 'full' },
  { path: AppURl.AppHome, loadChildren: () => import('../views/home/home.module').then( m => m.HomePageModule)},
  { path: AppURl.AppInfo, loadChildren: () => import('../views/info/info.module').then( m => m.InfoModule)},
  { path: AppURl.AppSuperHero, loadChildren: () => import('../views/super-hero/super-hero.module').then( m => m.SuperHeroModule)},
  //Firebase
  { path: AppURl.AppSingIng, loadChildren: () => import('../core/components/sign-in/sign-in.module').then( m => m.SignInModule), canActivate: [SecureInnerPagesGuard]},
  { path: AppURl.AppRegisterUser, loadChildren: () => import('../core/components/sign-up/sing-up.module').then( m => m.SingUpModule), canActivate: [SecureInnerPagesGuard]},
  { path: AppURl.AppDashboard, loadChildren: () => import('../core/components/dashboard/dashboard.module').then( m => m.DashboardModule) ,canActivate: [AuthGuard]},
  { path: AppURl.AppForgotPassword, loadChildren: () => import('../core/components/forgot-password/forgot-password.module').then( m => m.ForgotPasswordModule) ,canActivate: [SecureInnerPagesGuard]},
  { path: AppURl.AppVerifyEmailAddres, loadChildren: () => import('../core/components/verify-email/verify-email.module').then( m => m.VerifyEmailModule),canActivate: [SecureInnerPagesGuard]},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
