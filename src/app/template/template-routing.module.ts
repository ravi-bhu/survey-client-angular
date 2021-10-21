import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template.component';
import { TemplateDetailsComponent } from './template-details/template-details.component';

const routes: Routes = [
  { path: '', component: TemplateComponent },
  { path: ':id', component: TemplateDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule {}
