import { Injectable } from '@angular/core';
import { RateService } from './rate.service';
import { Subscription, Subject } from 'rxjs';

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
    USD: 0.8,
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
  ,
  // additional commonly used currencies
  ARS: 1,
  BGN: 1,
  CLP: 1,
  COP: 1,
  EGP: 1,
  ISK: 1,
  KES: 1,
  KZT: 1,
  NGN: 1,
  PHP: 1,
  RON: 1,
  UAH: 1,
  VND: 1,
  TWD: 1,
  PKR: 1,
  LKR: 1,
  BDT: 1,
  GEL: 1,
  HRK: 1,
  MAD: 1,
  PAB: 1,
  // additional Gulf / regional currencies
  BHD: 1,
  KGS: 1,
  KWD: 1,
  OMR: 1,
  QAR: 1,
  // requested special / regional currencies
  XCG: 1,
  XDR: 1,
  VES: 1,
  TVD: 1,
  STN: 1,
  SLE: 1,
  MRU: 1,
  JEP: 1,
  IMP: 1,
  KID: 1,
  // non-ISO / regional codes
  FOK: 1,
  GGP: 1
  };

  // current live rates populated from API or cache
  private currentRates: Rates | null = null;
  private refreshSub: Subscription | null = null;
  // API diagnostic info
  public apiError: string | null = null;
  public apiKeyMissing: boolean = false;

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

  ,
  // additional commonly used currencies
  ARS: { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷' },
  BGN: { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬' },
  CLP: { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱' },
  COP: { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴' },
  EGP: { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬' },
  ISK: { code: 'ISK', name: 'Icelandic Krona', symbol: 'kr', flag: '🇮🇸' },
  KES: { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
  KZT: { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸', flag: '🇰🇿' },
  NGN: { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
  PHP: { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  RON: { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴' },
  UAH: { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', flag: '🇺🇦' },
  VND: { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
  TWD: { code: 'TWD', name: 'New Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼' },
  PKR: { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
  LKR: { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', flag: '🇱🇰' },
  BDT: { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
  GEL: { code: 'GEL', name: 'Georgian Lari', symbol: '₾', flag: '🇬🇪' },
  HRK: { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷' },
  MAD: { code: 'MAD', name: 'Moroccan Dirham', symbol: 'MAD', flag: '🇲🇦' },
  PAB: { code: 'PAB', name: 'Panamanian Balboa', symbol: 'B/.', flag: '🇵🇦' }
  ,
  // additional Gulf / regional currencies
  BHD: { code: 'BHD', name: 'Bahraini Dinar', symbol: 'ب.د', flag: '🇧🇭' },
  KGS: { code: 'KGS', name: 'Kyrgyzstani Som', symbol: 'сом', flag: '🇰🇬' },
  KWD: { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼' },
  OMR: { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.', flag: '🇴🇲' },
  QAR: { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق', flag: '🇶🇦' }
  ,
  // requested special / regional currencies
  XCG: { code: 'XCG', name: 'Caribbean Guilder', symbol: 'XCG', flag: '🇨🇼' },
  XDR: { code: 'XDR', name: 'Special Drawing Rights', symbol: 'SDR', flag: '💱' },
  VES: { code: 'VES', name: 'Venezuelan Bolívar (Sovereign)', symbol: 'Bs.S', flag: '🇻🇪' },
  TVD: { code: 'TVD', name: 'Tuvalu Dollar', symbol: '$', flag: '🇹🇻' },
  STN: { code: 'STN', name: 'Sao Tome and Principe Dobra', symbol: 'Db', flag: '🇸🇹' },
  SLE: { code: 'SLE', name: 'Sierra Leonean Leone', symbol: 'Le', flag: '🇸🇱' },
  MRU: { code: 'MRU', name: 'Mauritanian Ouguiya', symbol: 'UM', flag: '🇲🇷' },
  JEP: { code: 'JEP', name: 'Jersey Pound', symbol: '£', flag: '🇯🇪' },
  IMP: { code: 'IMP', name: 'Manx Pound', symbol: '£', flag: '🇮🇲' },
  KID: { code: 'KID', name: 'Kiribati Dollar', symbol: '$', flag: '🇰🇮' }
  ,
  // non-ISO / regional codes
  FOK: { code: 'FOK', name: 'Faroese Króna', symbol: 'kr', flag: '🇫🇴' },
  GGP: { code: 'GGP', name: 'Guernsey Pound', symbol: '£', flag: '🇬🇬' }
  };

  constructor(private rateSvc: RateService) {
    // load cached rates if available and trigger an immediate refresh
    this.loadCachedRates('EUR');
    // try to load a currency full-name map (english) from a public dataset; non-blocking
    this.loadCurrencyNames();
  // try to load country -> currency -> flag map so we can show more accurate flags
  this.loadCountryFlags();
    // schedule a daily refresh (24h)
    setInterval(() => this.refreshRates('EUR'), 24 * 60 * 60 * 1000);
  }

  // optional map of currency code -> full english name loaded from upstream dataset
  private currencyNames: Record<string,string> = {};

  // optional map built from countries.json mapping currency code -> representative country flag
  private countryFlags: Record<string,string> = {};

  private async loadCurrencyNames() {
    try {
      const res = await fetch('https://raw.githubusercontent.com/umpirsky/currency-list/master/data/en/currency.json');
      if (!res.ok) return;
      const json = await res.json();
      this.currencyNames = json || {};
      try { this.currenciesChange.next(); } catch {}
    } catch {}
  }

  /**
   * Try to derive a currency code -> flag emoji map from a public countries dataset.
   * This improves flag coverage for currencies that are missing in our small FLAG_MAP.
   */
  private async loadCountryFlags() {
    try {
      const res = await fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json');
      if (!res.ok) return;
      const list = await res.json();
      // iterate countries and map each currency code to the country's flag emoji (first seen wins)
      for (const country of list || []) {
        try {
          const flag = country.flag as string | undefined;
          const currencies = country.currencies || {};
          if (!flag) continue;
          for (const code of Object.keys(currencies)) {
            if (!this.countryFlags[code]) this.countryFlags[code] = flag;
          }
        } catch {}
      }
      try { this.currenciesChange.next(); } catch {}
    } catch {}
  }

  // mapping from currency code to a reasonable flag emoji fallback
  private FLAG_MAP: Record<string,string> = {
    USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', JPY: '🇯🇵', CHF: '🇨🇭', AUD: '🇦🇺', CAD: '🇨🇦', CNY: '🇨🇳',
    SEK: '🇸🇪', NOK: '🇳🇴', DKK: '🇩🇰', INR: '🇮🇳', BRL: '🇧🇷', ZAR: '🇿🇦', NZD: '🇳🇿', SGD: '🇸🇬',
    HKD: '🇭🇰', MXN: '🇲🇽', RUB: '🇷🇺', TRY: '🇹🇷', PLN: '🇵🇱', HUF: '🇭🇺', CZK: '🇨🇿', IDR: '🇮🇩',
    THB: '🇹🇭', ILS: '🇮🇱', AED: '🇦🇪', SAR: '🇸🇦', ARS: '🇦🇷', BGN: '🇧🇬', CLP: '🇨🇱', COP: '🇨🇴',
    EGP: '🇪🇬', ISK: '🇮🇸', KES: '🇰🇪', KZT: '🇰🇿', NGN: '🇳🇬', PHP: '🇵🇭', RON: '🇷🇴', UAH: '🇺🇦',
    VND: '🇻🇳', TWD: '🇹🇼', PKR: '🇵🇰', LKR: '🇱🇰', BDT: '🇧🇩', GEL: '🇬🇪', HRK: '🇭🇷', MAD: '🇲🇦',
    PAB: '🇵🇦', BHD: '🇧🇭', KGS: '🇰🇬', KWD: '🇰🇼', OMR: '🇴🇲', QAR: '🇶🇦', ZWL: '🇿🇼',
    FOK: '🇫🇴', GGP: '🇬🇬',
    // Additional currencies from meta that were missing flags
    XCG: '🇨🇼', XDR: '💱', VES: '🇻🇪', TVD: '🇹🇻', STN: '🇸🇹', SLE: '🇸🇱', MRU: '🇲🇷',
    JEP: '🇯🇪', IMP: '🇮🇲', KID: '🇰🇮',
    // Common additional currencies that might appear in API responses
    AMD: '🇦🇲', AOA: '🇦🇴', AWG: '🇦🇼', AZN: '🇦🇿', BAM: '🇧🇦', BBD: '🇧🇧', BIF: '🇧🇮', BMD: '🇧🇲',
    BND: '🇧🇳', BOB: '🇧🇴', BSD: '🇧🇸', BTN: '🇧🇹', BWP: '🇧🇼', BYN: '🇧🇾', BZD: '🇧🇿', CDF: '🇨🇩',
    CRC: '🇨🇷', CUP: '🇨🇺', CVE: '🇨🇻', DJF: '🇩🇯', DOP: '🇩🇴', DZD: '🇩🇿', ERN: '🇪🇷', ETB: '🇪🇹',
    FJD: '🇫🇯', FKP: '🇫🇰', GHS: '🇬🇭', GIP: '🇬🇮', GMD: '🇬🇲', GNF: '🇬🇳', GTQ: '🇬🇹', GYD: '🇬🇾',
    HNL: '🇭🇳', HTG: '🇭🇹', IQD: '🇮🇶', IRR: '🇮🇷', JMD: '🇯🇲', JOD: '🇯🇴', KHR: '🇰🇭', KMF: '🇰🇲',
    KPW: '🇰🇵', KRW: '🇰🇷', LAK: '🇱🇦', LBP: '🇱🇧', LRD: '🇱🇷', LSL: '🇱🇸', LYD: '🇱🇾', MDL: '🇲🇩',
    MGA: '🇲🇬', MKD: '🇲🇰', MMK: '🇲🇲', MNT: '🇲🇳', MOP: '🇲🇴', MUR: '🇲🇺', MVR: '🇲🇻', MWK: '🇲🇼',
    MYR: '🇲🇾', MZN: '🇲🇿', NAD: '🇳🇦', NIO: '🇳🇮', NPR: '🇳🇵', PEN: '🇵🇪', PGK: '🇵🇬', PYG: '🇵🇾',
    RSD: '🇷🇸', RWF: '🇷🇼', SBD: '🇸🇧', SCR: '🇸🇨', SDG: '🇸🇩', SHP: '🇸🇭', SLL: '🇸🇱', SOS: '🇸🇴',
    SRD: '🇸🇷', SYP: '🇸🇾', SZL: '🇸🇿', TJS: '🇹🇯', TMT: '🇹🇲', TND: '🇹🇳', TOP: '🇹🇴', TTD: '🇹🇹',
    UGX: '🇺🇬', UYU: '🇺🇾', UZS: '🇺🇿', VUV: '🇻🇺', WST: '🇼🇸', XAF: '🇨🇲', XCD: '🇦🇬', XOF: '🇸🇳',
    XPF: '🇵🇫', YER: '🇾🇪', ZMW: '🇿🇲'
  };

  private ensureFlagsForCodes(codes: string[]) {
    try {
      for (const c of codes) {
        if (!this.meta[c]) this.meta[c] = { code: c, name: c };
        if (!this.meta[c].flag) {
          // prefer a flag derived from countries dataset, then the static FLAG_MAP
          const f = (this.countryFlags && this.countryFlags[c]) || this.FLAG_MAP[c];
          if (f) this.meta[c].flag = f;
        }
        if (!Object.prototype.hasOwnProperty.call(this.fallbackRates, c)) this.fallbackRates[c] = 1;
      }
    } catch {}
  }

  // notify consumers when available currencies change
  public currenciesChange: Subject<void> = new Subject();

  listCurrencies(): string[] {
  // prefer live/current rates keys merged with fallback/meta so UI has a stable full list
  const rates = this.getRates();
  const keys = Object.keys(rates);
  return keys.sort();
  }

  // Comprehensive mapping of currency codes to their symbols for currencies not in meta
  private readonly CURRENCY_SYMBOLS: Record<string, string> = {
    // Additional Asia Pacific currencies not in meta
    KRW: '₩', MYR: 'RM', MMK: 'K', KHR: '៛', LAK: '₭', MOP: 'MOP$', BND: 'B$', 
    NCF: '₣', XPF: '₣', NPR: '₨', WST: 'WS$',
    // Additional Americas currencies not in meta
    PEN: 'S/', UYU: '$U', PYG: '₲', BOB: 'Bs', GYD: 'G$', SRD: '$', TTD: 'TT$', 
    JMD: 'J$', BBD: 'Bds$', BSD: 'B$', BZD: 'BZ$', GTQ: 'Q', HNL: 'L', NIO: 'C$', 
    CRC: '₡', DOP: 'RD$', HTG: 'G', CUP: '$', XCD: 'EC$', AWG: 'ƒ', ANG: 'ƒ',
    // Additional Europe currencies not in meta
    MDL: 'L', BYN: 'Br', AMD: '֏', AZN: '₼', ALL: 'L', MKD: 'ден', BAM: 'KM', RSD: 'дин',
    // Additional Africa currencies not in meta
    UGX: 'USh', TZS: 'TSh', RWF: '₣', ETB: 'Br', GHS: '₵', XOF: '₣', XAF: '₣', 
    TND: 'د.ت', DZD: 'د.ج', LYD: 'ل.د', SDG: 'ج.س.', SOS: 'S', DJF: 'Fdj', ERN: 'Nfk', 
    MWK: 'MK', ZMW: 'ZK', BWP: 'P', SZL: 'L', LSL: 'L', NAD: 'N$', AOA: 'Kz', MZN: 'MT',
    MGA: 'Ar', KMF: '₣', SCR: '₨', MUR: '₨', MVR: '.ރ',
    // Additional Middle East currencies not in meta
    LBP: '£', SYP: '£', IQD: 'ع.د', IRR: '﷼', AFN: '؋', JOD: 'د.ا',
    // Additional Pacific currencies not in meta
    FJD: 'FJ$', PGK: 'K', SBD: 'SI$', TOP: 'T$', VUV: 'VT', CKD: '$'
  };

  getInfo(code: string): CurrencyInfo {
    // ensure we return a persistent meta object and fill fallback flag/name when missing
    let info = this.meta[code];
    if (!info) {
      info = { code, name: code };
      // attach fallback flag if available
  const f = (this as any).countryFlags?.[code] || (this as any).FLAG_MAP && (this as any).FLAG_MAP[code];
      if (f) info.flag = f;
      // provide proper currency symbol or fallback to code
      info.symbol = this.CURRENCY_SYMBOLS[code] || code;
      this.meta[code] = info;
      return info;
    }
    // if info exists but lacks a flag, try to fill from FLAG_MAP
    if (!info.flag) {
  const f = (this as any).countryFlags?.[code] || (this as any).FLAG_MAP && (this as any).FLAG_MAP[code];
  if (f) info.flag = f;
    }
    if (!info.name) {
      info.name = this.currencyNames[code] || code;
    }
    // ensure symbol is always defined - prefer predefined symbols over existing ones
    if (!info.symbol || info.symbol === code) {
      info.symbol = this.CURRENCY_SYMBOLS[code] || code;
    }
    return info;
  }

  // public helper to get a flag (meta flag or fallback map) without duplicating logic in components
  public getFlag(code: string): string {
    try {
      const info = this.getInfo(code);
      if (info && info.flag) return info.flag;
      const f = (this as any).FLAG_MAP && (this as any).FLAG_MAP[code];
      return f || '';
    } catch { return '' }
  }

  convert(amount: number, from: string): Rates {
    // Ensure we operate on a stable rate map that always contains the base currency (value 1)
    const rates = this.getRates();
    const fromRate = Number(rates[from] ?? 1);
    const eur = amount / (fromRate || 1);
    const out: Rates = {};
    for (const [k, r] of Object.entries(rates)) {
      const val = Number(r ?? 0);
      out[k] = +(eur * val);
    }
    return out;
  }

  // return active rates (live if available, otherwise fallback)
  getRates(): Rates {
  // merge fallback keys (neutral 1) with any live/current rates so the UI always has the full set
  // live rates override fallbacks when present
  return { ...this.fallbackRates, ...(this.currentRates ?? {}) };
  }

  // fetch latest rates from API and cache them
  // Always fetch latest rates with EUR as the base so all rates are EUR-based (EUR = 1)
  refreshRates(_) {
    const base = 'EUR';
    this.refreshSub?.unsubscribe();
    this.refreshSub = this.rateSvc.fetchLatest(base).subscribe({
      next: (data) => {
        try {
          // reset API diagnostic flags when we get a response
          this.apiError = null;
          this.apiKeyMissing = false;
          // RateService can now return a structured error when no provider matched
          const anyData: any = data as any;
          if (anyData && anyData.error === 'no_provider' && Array.isArray(anyData.tried)) {
            this.apiError = 'No provider returned usable FX rates. Tried: ' + anyData.tried.join(', ');
            return;
          }
          // handle cases where RateService emitted null or a response without usable rates
          if (!anyData || !anyData.rates || Object.keys(anyData.rates || {}).length === 0) {
            const msg = anyData && (anyData.error || anyData.message) ? (anyData.error || anyData.message) : 'No provider returned usable FX rates';
            this.apiError = typeof msg === 'string' ? msg : JSON.stringify(msg);
            if (/api[_\s-]?key|apikey|access denied|401|403/i.test(this.apiError)) this.apiKeyMissing = true;
            return;
          }
          const baseRate = anyData.rates || {};
          // ensure EUR is present with rate 1 and normalize numeric values
          const normalized: Rates = { EUR: 1 } as Rates;
          for (const k of Object.keys(baseRate)) normalized[k] = Number(baseRate[k]);
          this.currentRates = normalized;
          // ensure meta and fallbackRates include entries (and flags) for all returned codes
          try { this.ensureFlagsForCodes(Object.keys(normalized)); } catch {}
          try { this.currenciesChange.next(); } catch {}
          // cache for today under EUR base
          const key = 'converter:rates:' + base;
          const payload = { date: anyData.date || new Date().toISOString().slice(0,10), fetchedAt: new Date().toISOString(), baseRates: baseRate, source: anyData._source || null };
          try { localStorage.setItem(key, JSON.stringify(payload)); } catch {}
        } catch {
          this.currentRates = null;
        }
      },
      error: (err: any) => {
        // record API error and detect missing/invalid API key
        try {
          const msg = err && (err.error || err.message) ? (err.error?.message || err.message || err.error) : JSON.stringify(err);
          this.apiError = typeof msg === 'string' ? msg : JSON.stringify(msg);
          if (err && (err.status === 401 || err.status === 403) || /api[_\s-]?key|apikey|access denied|401|403/i.test(this.apiError)) {
            this.apiKeyMissing = true;
          }
        } catch (e) {
          this.apiError = String(err);
        }
        // keep existing currentRates or fallback
        this.currentRates = this.currentRates ?? null;
      }
    });
  }

  // expose simple API status for UI debugging
  getApiStatus() { return { apiError: this.apiError, apiKeyMissing: this.apiKeyMissing }; }

  private loadCachedRates(base: string = 'EUR') {
    try {
      const key = 'converter:rates:' + base;
      const raw = localStorage.getItem(key);
      const today = new Date().toISOString().slice(0,10);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.date === today && parsed.baseRates) {
          this.currentRates = parsed.baseRates as Rates;
          // make sure meta and fallbackRates contain all cached currency codes and attach flags
          try { this.ensureFlagsForCodes(Object.keys(this.currentRates || {})); } catch {}
          try { this.currenciesChange.next(); } catch {}
          return;
        }
      }
    } catch {}
    // otherwise fetch now
    this.refreshRates(base);
  }
}
