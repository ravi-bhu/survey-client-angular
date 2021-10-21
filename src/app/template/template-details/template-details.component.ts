import { Component, OnInit } from '@angular/core';
import { TemplateDetails, TemplateService } from '../template.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss'],
})
export class TemplateDetailsComponent implements OnInit {
  templateDetails$!: Observable<TemplateDetails>;

  constructor(
    private templateService: TemplateService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const uuid = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.templateDetails$ = this.templateService.getTemplateDetails(uuid).pipe(
      map((templateDetails) => ({
        ...templateDetails,
        data: JSON.stringify(templateDetails.data, null, 2),
      }))
    );
  }
}
