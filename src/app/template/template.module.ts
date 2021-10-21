import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateComponent } from './template.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateRoutingModule } from './template-routing.module';
import { MaterialModule } from '../material.module';
import { TemplateDetailsComponent } from './template-details/template-details.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    TemplateComponent,
    TemplateListComponent,
    TemplateDetailsComponent,
  ],
  imports: [CommonModule, TemplateRoutingModule, MaterialModule, MatSortModule],
})
export class TemplateModule {}
