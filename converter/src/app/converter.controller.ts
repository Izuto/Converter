import { Injectable } from '@angular/core';
import { CurrencyService, Rates } from './currency.service';
import { RateService } from './rate.service';

@Injectable({ providedIn: 'root' })
export class ConverterController {
  amount = 1;
  from = 'EUR';
  to = 'USD';
  results: Rates | null = null;
  singleResult: number | null = null;
  baseRateSingle: number | null = null;
  loading = false;
  lastUpdated: Date | null = null;
  rateSource: 'live'|'fallback'|'cached'|'local'|null = null;

  constructor(private svc: CurrencyService, private rateSvc: RateService) {
    this.currencies = svc.listCurrencies();
    try {
      const data = JSON.parse(localStorage.getItem('converter:state') || '{}');
      if (data) {
        this.from = data.from || this.from;
        this.to = data.to || this.to;
        this.amount = data.amount || this.amount;
      }
    } catch {}
  }

  currencies: string[] = [];

  listCurrencies() { return this.currencies }

  canConvert() {
    return this.amount !== null && this.amount >= 0 && this.from && this.to && this.from !== this.to && !this.loading;
  }

  convert() {
    if (!this.canConvert()) return;
    this.loading = true;

    // quick immediate fallback so user sees something while live fetch runs
    try {
      this.results = this.svc.convert(this.amount, this.from);
      {
        const candidate = this.to && this.results ? this.results[this.to] ?? null : null;
        if (candidate !== null && candidate !== undefined && Number.isFinite(candidate as number)) {
          this.singleResult = candidate as number;
          this.baseRateSingle = (candidate as number) / this.amount;
        }
      }
      this.lastUpdated = this.lastUpdated || new Date();
      this.rateSource = 'fallback';
    } catch {}

    // check cache (localStorage) to avoid daily refetch
    try {
      const key = 'converter:rates:' + this.from;
      const raw = localStorage.getItem(key);
      const today = new Date().toISOString().slice(0,10); // YYYY-MM-DD
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.date === today && parsed.baseRates) {
          // use cached baseRates
          const baseRate = parsed.baseRates as { [k:string]: number };
          const rates: Rates = {};
          for (const k of Object.keys(baseRate)) {
            rates[k] = +(this.amount * baseRate[k]);
          }
          this.results = rates;
          {
            const candidate = this.to ? this.results[this.to] ?? null : null;
            if (candidate !== null && candidate !== undefined && Number.isFinite(candidate as number)) {
              this.singleResult = candidate as number;
              this.baseRateSingle = (candidate as number) / this.amount;
            }
          }
          this.lastUpdated = parsed.fetchedAt ? new Date(parsed.fetchedAt) : new Date();
          this.rateSource = 'cached';
          this.loading = false;
          try { localStorage.setItem('converter:state', JSON.stringify({ from: this.from, to: this.to, amount: this.amount })) } catch {}
          return;
        }
      }
    } catch {}

    // fetch live rates and cache them for a day
    this.rateSvc.fetchLatest(this.from).subscribe({
      next: (data) => {
        try {
          const baseRate = data.rates || {};
          const rates: Rates = {};
          for (const k of Object.keys(baseRate)) {
            rates[k] = +(this.amount * baseRate[k]);
          }
          this.results = rates;
          {
            const candidate = this.to ? this.results[this.to] ?? null : null;
            if (candidate !== null && candidate !== undefined && Number.isFinite(candidate as number)) {
              this.singleResult = candidate as number;
              this.baseRateSingle = (candidate as number) / this.amount;
            }
          }
          this.lastUpdated = new Date();
          this.rateSource = 'live';
          // cache baseRates with date and fetchedAt
          const key = 'converter:rates:' + this.from;
          const payload = { date: data.date || new Date().toISOString().slice(0,10), fetchedAt: new Date().toISOString(), baseRates: baseRate };
          try { localStorage.setItem(key, JSON.stringify(payload)) } catch {}
        } catch (e) {
          // fallback handled below
          this.results = this.svc.convert(this.amount, this.from);
          {
            const candidate = this.to && this.results ? this.results[this.to] ?? null : null;
            if (candidate !== null && candidate !== undefined && Number.isFinite(candidate as number)) {
              this.singleResult = candidate as number;
              this.baseRateSingle = (candidate as number) / this.amount;
            }
          }
          this.lastUpdated = new Date();
          this.rateSource = 'fallback';
        }
        this.loading = false;
        try { localStorage.setItem('converter:state', JSON.stringify({ from: this.from, to: this.to, amount: this.amount })) } catch {}
      },
      error: () => {
        // fallback to static local rates
        this.results = this.svc.convert(this.amount, this.from);
        {
          const candidate = this.to && this.results ? this.results[this.to] ?? null : null;
          if (candidate !== null && candidate !== undefined && Number.isFinite(candidate as number)) {
            this.singleResult = candidate as number;
            this.baseRateSingle = (candidate as number) / this.amount;
          }
        }
        this.lastUpdated = new Date();
        this.rateSource = 'fallback';
        this.loading = false;
      }
    });
  }

  swap() {
    const a = this.from; 
    this.from = this.to; 
    this.to = a; 
    this.singleResult = null;
    this.baseRateSingle = null;
    this.convert();
  }

  getRate(code: string) { return this.results?.[code] ?? null }
}
