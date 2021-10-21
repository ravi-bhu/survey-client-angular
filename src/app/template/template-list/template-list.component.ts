import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  catchError,
  map,
  mergeAll,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { TemplateService } from '../template.service';

export interface Template {
  position: number;
  id: number;
  name: string;
  description: number;
}

export interface TemplateApi {
  content: Template[];
  totalElements: number;
}

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
})
export class TemplateListComponent implements AfterViewInit {
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  templateDataSource: Template[] = [];
  displayedColumns: string[] = ['name', 'description'];
  selection = new SelectionModel<Template>(false, []);

  constructor(
    private _httpClient: HttpClient,
    private templateService: TemplateService
  ) {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    of(this.sort.sortChange, this.paginator.page)
      .pipe(
        mergeAll(),
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.templateService
            .getTemplates(
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
              this.paginator.pageSize
            )
            .pipe(catchError(() => of(null)));
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;
          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalElements;
          return data.content;
        })
      )
      .subscribe((data) => (this.templateDataSource = data));
  }
}
