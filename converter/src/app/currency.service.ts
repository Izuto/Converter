import { Injectable } from '@angular/core';
import { RateService } from './rate.service';
import { Subscription } from 'rxjs';

export interface Rates { [code: string]: number }

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol?: string;
  flag?: string; // small emoji flag where available
}

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  // Minimal fallback rates so UI has keys before live data arrives. Values are neutral (1)
  // and will be replaced by live API rates when available.
  private fallbackRates: Rates = {
    EUR: 1,
    USD: 1,
    GBP: 1,
    JPY: 1,
    CHF: 1,
    AUD: 1,
    CAD: 1,
    CNY: 1,
    SEK: 1,
    NOK: 1,
    DKK: 1,
    INR: 1,
    BRL: 1,
    ZAR: 1,
    NZD: 1,
    SGD: 1,
    HKD: 1,
    MXN: 1,
    RUB: 1,
    TRY: 1,
    PLN: 1,
    HUF: 1,
    CZK: 1,
    IDR: 1,
    THB: 1,
    ILS: 1,
    AED: 1,
    SAR: 1
  };

  // current live rates populated from API or cache
  private currentRates: Rates | null = null;
  private refreshSub: Subscription | null = null;

  // metadata for display
  private meta: { [code: string]: CurrencyInfo } = {
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  CHF: { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  CNY: { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  SEK: { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  NOK: { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  DKK: { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  BRL: { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  ZAR: { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  NZD: { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  SGD: { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  HKD: { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  MXN: { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  RUB: { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  TRY: { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  PLN: { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
  HUF: { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
  CZK: { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  IDR: { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  THB: { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  ILS: { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
  AED: { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  SAR: { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦' }
  };

  constructor(private rateSvc: RateService) {
    // load cached rates if available and trigger an immediate refresh
    this.loadCachedRates('EUR');
    // schedule a daily refresh (24h)
    setInterval(() => this.refreshRates('EUR'), 24 * 60 * 60 * 1000);
  }

  listCurrencies(): string[] {
    // prefer live/current rates keys; otherwise fall back to metadata keys
    const rates = this.getRates();
    const keys = Object.keys(rates && Object.keys(rates).length ? rates : this.meta);
    return keys.sort();
  }

  getInfo(code: string): CurrencyInfo {
    return this.meta[code] || { code, name: code };
  }

  convert(amount: number, from: string): Rates {
    const rates = this.getRates();
    const fromRate = rates[from] || 1;
    const eur = amount / fromRate;
    const out: Rates = {};
    for (const [k, r] of Object.entries(rates)) {
      out[k] = +(eur * r);
    }
    return out;
  }

  // return active rates (live if available, otherwise fallback)
  getRates(): Rates {
    return this.currentRates ?? this.fallbackRates;
  }

  // fetch latest rates from API and cache them
  refreshRates(base: string = 'EUR') {
    this.refreshSub?.unsubscribe();
    this.refreshSub = this.rateSvc.fetchLatest(base).subscribe({
      next: (data) => {
        try {
          const baseRate = data.rates || {};
          this.currentRates = { ...baseRate } as Rates;
          // cache for today
          const key = 'converter:rates:' + base;
          const payload = { date: data.date || new Date().toISOString().slice(0,10), fetchedAt: new Date().toISOString(), baseRates: baseRate };
          try { localStorage.setItem(key, JSON.stringify(payload)); } catch {}
        } catch {
          this.currentRates = null;
        }
      },
      error: () => {
        // keep existing currentRates or fallback
        this.currentRates = this.currentRates ?? null;
      }
    });
  }

  private loadCachedRates(base: string = 'EUR') {
    try {
      const key = 'converter:rates:' + base;
      const raw = localStorage.getItem(key);
      const today = new Date().toISOString().slice(0,10);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.date === today && parsed.baseRates) {
          this.currentRates = parsed.baseRates as Rates;
          return;
        }
      }
    } catch {}
    // otherwise fetch now
    this.refreshRates(base);
  }
}
