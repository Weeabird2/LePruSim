import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { CatalogInfo } from '../data/catalog-info';

@Injectable({
  providedIn: 'root',
})
export class Catalog {
  private load$?: Observable<CatalogInfo>;
  catalog = signal<CatalogInfo | null>(null);

  constructor(private http: HttpClient) {}

  loadCataolg(): Observable<CatalogInfo> {
    if (!this.load$) {
      this.load$ = this.http.get<CatalogInfo>('http://localhost:3000/api/catalogs').pipe(
        tap((data) => this.catalog.set(data)),
        shareReplay(1),
      );
    }
    return this.load$;
  }
}
