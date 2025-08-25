import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RateService {
  // open.er-api.com provides free EUR-base rates without an API key
  private readonly provider = 'https://open.er-api.com/v6';

  constructor(private http: HttpClient) {}

  fetchLatest(base: string = 'EUR') {
    // open.er-api uses path /v6/latest/{base}
    const url = `${this.provider}/latest/${encodeURIComponent(base)}`;
    return this.http.get<any>(url);
  }
}
