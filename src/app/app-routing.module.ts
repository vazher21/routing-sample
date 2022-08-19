import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './core/auth/services/auth.service';
import { SalaryGuard } from './shared/guards/salary.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.module').then((res) => res.AuthModule),
  },
  {
    path: 'currency',
    loadChildren: () =>
      import('./features/currency/currency.module').then(
        (res) => res.CurrencyModule
      ),
    canLoad: [AuthGuard, SalaryGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
