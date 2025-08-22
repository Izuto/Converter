import { Injectable } from '@angular/core';

export interface Rates { [code: string]: number }

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol?: string;
  flag?: string; // small emoji flag where available
}

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  // static example rates relative to EUR (not real-time)
  private rates: Rates = {
    EUR: 1,
    USD: 1.08,
    GBP: 0.86,
    JPY: 157.3,
    CHF: 0.98,
    AUD: 1.63,
    CAD: 1.46,
    CNY: 7.87,
    SEK: 12.45,
    NOK: 12.02,
    DKK: 7.45,
    INR: 91.23,
    BRL: 5.62,
    ZAR: 20.13,
    NZD: 1.79,
    SGD: 1.44,
    HKD: 8.49,
    MXN: 19.73,
    RUB: 95.4,
    TRY: 38.62
  };

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
    TRY: { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' }
  };

  listCurrencies(): string[] {
    return Object.keys(this.rates).sort();
  }

  getInfo(code: string): CurrencyInfo {
    return this.meta[code] || { code, name: code };
  }

  convert(amount: number, from: string): Rates {
    const fromRate = this.rates[from] || 1;
    const eur = amount / fromRate;
    const out: Rates = {};
    for (const [k, r] of Object.entries(this.rates)) {
      out[k] = +(eur * r);
    }
    return out;
  }
}
