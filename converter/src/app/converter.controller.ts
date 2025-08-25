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

  // kick off a live refresh immediately so API data will arrive asap
  try { this.svc.refreshRates('EUR'); } catch {}

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
  // mark not loading so UI updates immediately with fallback
  this.loading = false;
    } catch {}

    // check cache (EUR-based) to avoid daily refetch
    try {
      const key = 'converter:rates:EUR';
      const raw = localStorage.getItem(key);
      const today = new Date().toISOString().slice(0,10); // YYYY-MM-DD
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.date === today && parsed.baseRates) {
          // baseRates are EUR-based (1 EUR = baseRates[target])
          const baseRate = parsed.baseRates as { [k:string]: number };
          // check whether the cached rates are just neutral placeholders (all 1)
          const entries = Object.keys(baseRate || {});
          const nonNeutral = entries.some(k => {
            const v = Number(baseRate[k]);
            return Number.isFinite(v) && Math.abs(v - 1) > 1e-9;
          });
          if (!nonNeutral) {
            // cache is neutral (likely produced from fallback) — ignore and let live fetch update
            console.warn('Ignoring neutral EUR cache — forcing live fetch');
          } else {
            const rates: Rates = {};
            // compute amounts: given amount in `from`, convert to EUR then to target
            const fromRate = Number(baseRate[this.from] ?? (this.from === 'EUR' ? 1 : null));
            const eurAmount = this.amount / (fromRate || 1);
            for (const k of Object.keys(baseRate)) {
              rates[k] = +(eurAmount * Number(baseRate[k]));
            }
            // ensure EUR itself is present
            rates['EUR'] = +(eurAmount * 1);
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
      }
    } catch {}

    // trigger a live refresh that will overwrite fallback/cached results when available
    try { this.forceRefresh(); } catch {}
  }

  // force a live fetch of EUR-based rates and update results immediately when received
  forceRefresh(): void {
    this.loading = true;
    this.rateSvc.fetchLatest('EUR').subscribe({
      next: (data) => {
        try {
          const anyData: any = data as any;
          const baseRate = anyData.rates || {};
          const rates: Rates = {};
          const fromRate = Number(baseRate[this.from] ?? (this.from === 'EUR' ? 1 : 1));
          const eurAmount = this.amount / (fromRate || 1);
          for (const k of Object.keys(baseRate)) {
            rates[k] = +(eurAmount * Number(baseRate[k]));
          }
          rates['EUR'] = +(eurAmount * 1);
          this.results = rates;
          const candidate = this.to ? this.results[this.to] ?? null : null;
          if (candidate !== null && candidate !== undefined && Number.isFinite(candidate as number)) {
            this.singleResult = candidate as number;
            this.baseRateSingle = (candidate as number) / this.amount;
          }
          this.lastUpdated = new Date();
          this.rateSource = 'live';
          // refresh list from service
          this.currencies = this.svc.listCurrencies();
          // cache under EUR base
          const key = 'converter:rates:EUR';
          const payload = { date: anyData.date || new Date().toISOString().slice(0,10), fetchedAt: new Date().toISOString(), baseRates: baseRate, source: anyData._source || null };
          try { localStorage.setItem(key, JSON.stringify(payload)) } catch {}
        } catch (e) {
          console.warn('Error applying live rates, fallback used', e);
          // fallback
          this.results = this.svc.convert(this.amount, this.from);
          const candidate = this.to && this.results ? this.results[this.to] ?? null : null;
          if (candidate !== null && candidate !== undefined && Number.isFinite(candidate as number)) {
            this.singleResult = candidate as number;
            this.baseRateSingle = (candidate as number) / this.amount;
          }
          this.lastUpdated = new Date();
          this.rateSource = 'fallback';
        }
        this.loading = false;
        try { localStorage.setItem('converter:state', JSON.stringify({ from: this.from, to: this.to, amount: this.amount })) } catch {}
      },
      error: (err) => {
        console.warn('Failed to fetch live rates from configured providers', err);
        // fallback to local conversion
        this.results = this.svc.convert(this.amount, this.from);
        const candidate = this.to && this.results ? this.results[this.to] ?? null : null;
        if (candidate !== null && candidate !== undefined && Number.isFinite(candidate as number)) {
          this.singleResult = candidate as number;
          this.baseRateSingle = (candidate as number) / this.amount;
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

  // return cached metadata for EUR-based rates (if any)
  getCacheInfo(): { date?: string; fetchedAt?: string; size?: number } | null {
    try {
      const raw = localStorage.getItem('converter:rates:EUR');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const baseRates = parsed && parsed.baseRates ? parsed.baseRates as { [k:string]: number } : {};
      return { date: parsed?.date, fetchedAt: parsed?.fetchedAt, size: Object.keys(baseRates).length };
    } catch {
      return null;
    }
  }

  // return debug info: numeric rates for current from/to and API info
  getDebugInfo(): { source: string | null; fromRate?: number | null; toRate?: number | null; apiUrl: string; hasCache: boolean } {
    const apiUrl = 'https://api.exchangerate.host/latest?base=EUR';
    try {
      const rates = this.svc.getRates();
      const fromRate = rates ? (Number(rates[this.from] ?? null)) : null;
      const toRate = rates ? (Number(rates[this.to] ?? null)) : null;
      const hasCache = !!localStorage.getItem('converter:rates:EUR');
      const api = this.svc.getApiStatus ? this.svc.getApiStatus() : { apiError: null, apiKeyMissing: false };
      return { source: this.rateSource, fromRate: Number.isFinite(fromRate) ? fromRate : null, toRate: Number.isFinite(toRate) ? toRate : null, apiUrl, hasCache, apiError: api.apiError, apiKeyMissing: api.apiKeyMissing } as any;
    } catch {
      return { source: this.rateSource, apiUrl, hasCache: false, apiError: null, apiKeyMissing: false } as any;
    }
  }
}
