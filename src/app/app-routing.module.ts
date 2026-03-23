import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RunsComponent } from './features/runs/runs.component';
import { ParameterSetsComponent } from './features/parameter-sets/parameter-sets.component';

const routes: Routes = [
  { path: '', redirectTo: 'runs', pathMatch: 'full' },
  { path: 'runs', component: RunsComponent },
  { path: 'parameter-sets', component: ParameterSetsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
