import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RateService {
  constructor(private http: HttpClient) {}

  // fetch latest rates for a base currency from exchangerate.host
  fetchLatest(base: string = 'EUR') {
    // returns observable
    return this.http.get<any>(`https://api.exchangerate.host/latest?base=${encodeURIComponent(base)}`);
  }
}
