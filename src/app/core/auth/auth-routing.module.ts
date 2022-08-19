import { RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: AuthComponent }])],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
