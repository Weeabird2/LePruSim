import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogInfo } from '../data/catalog-info';

@Injectable({
  providedIn: 'root',
})
export class Catalog {
  constructor(private http: HttpClient) {}
  getCatalog(): Observable<CatalogInfo> {
    return this.http.get<CatalogInfo>('assets/catalogs.json');
  }
}
