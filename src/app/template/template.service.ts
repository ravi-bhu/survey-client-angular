import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Template, TemplateApi } from './template-list/template-list.component';
import { SortDirection } from '@angular/material/sort';

export interface TemplateDetails extends Template {
  data: {};
}

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private httpClient: HttpClient) {}

  getTemplates(
    sortBy: string,
    order: SortDirection,
    page: number,
    size: number
  ) {
    let params = new HttpParams().set('page', page).set('size', size);
    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }
    if (order) {
      params = params.set('order', order);
    }
    const requestUrl = '/api/template';
    return this.httpClient.get<TemplateApi>(requestUrl, { params });
  }

  getTemplateDetails(uuid: string) {
    return this.httpClient.get<TemplateDetails>(`/api/template/${uuid}`);
  }
}
