import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type Lang = 'en'|'de'|'fr'|'es'|'it'|'pt'|'nl'|'ru'|'zh'|'ja';

@Injectable({ providedIn: 'root' })
export class I18nService {
  langs: { code: Lang, name: string, flag?: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  private translations: any = {
      en: {
    title: 'Converter',
    subtitle: 'Quick currency conversions',
    heroTitle: 'Currency converter',
    navLangLabel: 'Lang',
    calculate: 'Calculate',
      amount: 'Amount',
      positiveHint: 'Enter a positive value',
      from: 'From',
      to: 'To',
      convert: 'Convert',
      result: 'Result',
      swap: 'Swap currencies'
      ,
      currencies: {
        EUR: 'Euro', USD: 'US Dollar', GBP: 'British Pound', JPY: 'Japanese Yen', CHF: 'Swiss Franc', AUD: 'Australian Dollar', CAD: 'Canadian Dollar', CNY: 'Chinese Yuan', SEK: 'Swedish Krona', NOK: 'Norwegian Krone', DKK: 'Danish Krone', INR: 'Indian Rupee', BRL: 'Brazilian Real', ZAR: 'South African Rand', NZD: 'New Zealand Dollar', SGD: 'Singapore Dollar', HKD: 'Hong Kong Dollar', MXN: 'Mexican Peso', RUB: 'Russian Ruble', TRY: 'Turkish Lira',
        ARS: 'Argentine Peso', BGN: 'Bulgarian Lev', CLP: 'Chilean Peso', COP: 'Colombian Peso', EGP: 'Egyptian Pound', ISK: 'Icelandic Krona', KES: 'Kenyan Shilling', KZT: 'Kazakhstani Tenge', NGN: 'Nigerian Naira', PHP: 'Philippine Peso', RON: 'Romanian Leu', UAH: 'Ukrainian Hryvnia', VND: 'Vietnamese Dong', TWD: 'New Taiwan Dollar', PKR: 'Pakistani Rupee', LKR: 'Sri Lankan Rupee', BDT: 'Bangladeshi Taka', GEL: 'Georgian Lari', HRK: 'Croatian Kuna', MAD: 'Moroccan Dirham', PAB: 'Panamanian Balboa', BHD: 'Bahraini Dinar', KGS: 'Kyrgyzstani Som', KWD: 'Kuwaiti Dinar', OMR: 'Omani Rial', QAR: 'Qatari Riyal'
      }
  ,
  rateSource: { live: 'Live', fallback: 'Fallback', cached: 'Cached', local: 'Local' }
    },
    de: {
  title: 'Konverter',
  subtitle: 'Schnelle Währungsumrechnung',
  heroTitle: 'Währungsrechner',
  navLangLabel: 'Sprache',
  calculate: 'Berechnen',
      amount: 'Betrag',
      positiveHint: 'Geben Sie einen positiven Wert ein',
      from: 'Von',
      to: 'Nach',
      convert: 'Umrechnen',
      result: 'Ergebnis',
      swap: 'Währungen tauschen',
  currencies: { EUR: 'Euro', USD: 'US-Dollar', GBP: 'Britisches Pfund', JPY: 'Japanischer Yen', CHF: 'Schweizer Franken', AUD: 'Australischer Dollar', CAD: 'Kanadischer Dollar', CNY: 'Chinesischer Yuan', SEK: 'Schwedische Krone', NOK: 'Norwegische Krone', DKK: 'Dänische Krone', INR: 'Indische Rupie', BRL: 'Brasilianischer Real', ZAR: 'Südafrikanischer Rand', NZD: 'Neuseeländischer Dollar', SGD: 'Singapur-Dollar', HKD: 'Hongkong-Dollar', MXN: 'Mexikanischer Peso', RUB: 'Russischer Rubel', TRY: 'Türkische Lira', ARS: 'Argentinischer Peso', BGN: 'Bulgarischer Lew', CLP: 'Chilenischer Peso', COP: 'Kolumbianischer Peso', EGP: 'Ägyptisches Pfund', ISK: 'Isländische Krone', KES: 'Kenyaische Schilling', KZT: 'Kasachischer Tenge', NGN: 'Nigerianische Naira', PHP: 'Philippinischer Peso', RON: 'Rumänischer Leu', UAH: 'Ukrainische Hrywnja', VND: 'Vietnamesischer Dong', TWD: 'Neuer Taiwan-Dollar', PKR: 'Pakistanische Rupie', LKR: 'Sri-Lanka-Rupie', BDT: 'Bangladeschische Taka', GEL: 'Georgischer Lari', HRK: 'Kroatische Kuna', MAD: 'Marokkanischer Dirham', PAB: 'Panamaischer Balboa', BHD: 'Bahrain-Dinar', KGS: 'Kirgisischer Som', KWD: 'Kuwait-Dinar', OMR: 'Omanischer Rial', QAR: 'Katar-Riyal' },
  rateSource: { live: 'Live', fallback: 'Fallback', cached: 'Zwischengespeichert', local: 'Lokal' }
    },
    fr: {
  title: 'Convertisseur',
  subtitle: 'Conversions de devises rapides',
  heroTitle: 'Convertisseur',
  navLangLabel: 'Langue',
  calculate: 'Calculer',
      amount: 'Montant',
      positiveHint: 'Entrez une valeur positive',
      from: 'De',
      to: 'Vers',
      convert: 'Convertir',
      result: 'Résultat',
      swap: 'Permuter les monnaies',
  currencies: { EUR: 'Euro', USD: 'Dollar américain', GBP: 'Livre sterling', JPY: 'Yen japonais', CHF: 'Franc suisse', AUD: 'Dollar australien', CAD: 'Dollar canadien', CNY: 'Yuan chinois', SEK: 'Couronne suédoise', NOK: 'Couronne norvégienne', DKK: 'Couronne danoise', INR: 'Roupie indienne', BRL: 'Real brésilien', ZAR: 'Rand sud-africain', NZD: 'Dollar néo-zélandais', SGD: 'Dollar de Singapour', HKD: 'Dollar de Hong Kong', MXN: 'Peso mexicain', RUB: 'Rouble russe', TRY: 'Livre turque', ARS: 'Peso argentin', BGN: 'Lev bulgare', CLP: 'Peso chilien', COP: 'Peso colombien', EGP: 'Livre égyptienne', ISK: 'Couronne islandaise', KES: 'Shilling kényan', KZT: 'Tenge kazakh', NGN: 'Naira nigériane', PHP: 'Peso philippin', RON: 'Leu roumain', UAH: 'Hryvnia ukrainienne', VND: 'Dong vietnamien', TWD: 'Nouveau dollar taïwanais', PKR: 'Roupie pakistanaise', LKR: 'Roupie sri-lankaise', BDT: 'Taka bangladais', GEL: 'Lari géorgien', HRK: 'Kuna croate', MAD: 'Dirham marocain', PAB: 'Balboa panaméen', BHD: 'Dinar bahreïni', KGS: 'Som kirghiz', KWD: 'Dinar koweïtien', OMR: 'Rial omanais', QAR: 'Riyal qatari' },
  rateSource: { live: 'En direct', fallback: 'Secours', cached: 'Mise en cache', local: 'Local' }
    },
    es: {
  title: 'Convertidor',
  subtitle: 'Conversiones de moneda rápidas',
  heroTitle: 'Convertidor',
  navLangLabel: 'Idioma',
  calculate: 'Calcular',
      amount: 'Cantidad',
      positiveHint: 'Ingrese un valor positivo',
      from: 'De',
      to: 'A',
      convert: 'Convertir',
      result: 'Resultado',
      swap: 'Intercambiar monedas',
  currencies: { EUR: 'Euro', USD: 'Dólar estadounidense', GBP: 'Libra esterlina', JPY: 'Yen japonés', CHF: 'Franco suizo', AUD: 'Dólar australiano', CAD: 'Dólar canadiense', CNY: 'Yuan chino', SEK: 'Corona sueca', NOK: 'Corona noruega', DKK: 'Corona danesa', INR: 'Rupia india', BRL: 'Real brasileño', ZAR: 'Rand sudafricano', NZD: 'Dólar neozelandés', SGD: 'Dólar de Singapur', HKD: 'Dólar de Hong Kong', MXN: 'Peso mexicano', RUB: 'Rublo ruso', TRY: 'Lira turca', ARS: 'Peso argentino', BGN: 'Lev búlgaro', CLP: 'Peso chileno', COP: 'Peso colombiano', EGP: 'Libra egipcia', ISK: 'Corona islandesa', KES: 'Chelín keniano', KZT: 'Tenge kazajo', NGN: 'Naira nigeriana', PHP: 'Peso filipino', RON: 'Leu rumano', UAH: 'Hryvnia ucraniana', VND: 'Dong vietnamita', TWD: 'Nuevo dólar de Taiwán', PKR: 'Rupia pakistaní', LKR: 'Rupia de Sri Lanka', BDT: 'Taka de Bangladés', GEL: 'Lari georgiano', HRK: 'Kuna croata', MAD: 'Dírham marroquí', PAB: 'Balboa panameño', BHD: 'Dinar bahreiní', KGS: 'Som kirguís', KWD: 'Dinar kuwaití', OMR: 'Rial omaní', QAR: 'Riyal qatarí' },
  rateSource: { live: 'En vivo', fallback: 'Reserva', cached: 'En caché', local: 'Local' }
    },
    it: {
  title: 'Convertitore',
  subtitle: 'Conversioni valutarie rapide',
  heroTitle: 'Convertitore',
  navLangLabel: 'Lingua',
  calculate: 'Calcola',
      amount: 'Importo',
      positiveHint: 'Inserisci un valore positivo',
      from: 'Da',
      to: 'A',
      convert: 'Converti',
      result: 'Risultato',
      swap: 'Scambia valute',
  currencies: { EUR: 'Euro', USD: 'Dollaro USA', GBP: 'Sterlina britannica', JPY: 'Yen giapponese', CHF: 'Franco svizzero', AUD: 'Dollaro australiano', CAD: 'Dollaro canadese', CNY: 'Yuan cinese', SEK: 'Corona svedese', NOK: 'Corona norvegese', DKK: 'Corona danese', INR: 'Rupia indiana', BRL: 'Real brasiliano', ZAR: 'Rand sudafricano', NZD: 'Dollaro della Nuova Zelanda', SGD: 'Dollaro di Singapore', HKD: 'Dollaro di Hong Kong', MXN: 'Peso messicano', RUB: 'Rublo russo', TRY: 'Lira turca', ARS: 'Peso argentino', BGN: 'Lev bulgaro', CLP: 'Peso cileno', COP: 'Peso colombiano', EGP: 'Lira egiziana', ISK: 'Corona islandese', KES: 'Scellino keniota', KZT: 'Tenge kazako', NGN: 'Naira nigeriana', PHP: 'Peso filippino', RON: 'Leu rumeno', UAH: 'Hryvnia ucraina', VND: 'Dong vietnamita', TWD: 'Nuovo dollaro di Taiwan', PKR: 'Rupia pachistana', LKR: 'Rupia dello Sri Lanka', BDT: 'Taka bengalese', GEL: 'Lari georgiano', HRK: 'Kuna croata', MAD: 'Dirham marocchino', PAB: 'Balboa panamense', BHD: 'Dinaro del Bahrein', KGS: 'Som kirghiso', KWD: 'Dinaro kuwaitiano', OMR: 'Rial omanita', QAR: 'Riyal qatari' },
  rateSource: { live: 'Live', fallback: 'Fallback', cached: 'Cached', local: 'Locale' }
    },
    pt: {
  title: 'Conversor',
  subtitle: 'Conversões de moeda rápidas',
  heroTitle: 'Conversor',
  navLangLabel: 'Idioma',
  calculate: 'Calcular',
      amount: 'Valor',
      positiveHint: 'Insira um valor positivo',
      from: 'De',
      to: 'Para',
      convert: 'Converter',
      result: 'Resultado',
      swap: 'Trocar moedas',
      currencies: { EUR: 'Euro', USD: 'Dólar americano', GBP: 'Libra esterlina', JPY: 'Iene giapponese', CHF: 'Franco suíço', AUD: 'Dólar australiano', CAD: 'Dólar canadense', CNY: 'Yuan chinês', SEK: 'Coroa sueca', NOK: 'Coroa norueguesa', DKK: 'Coroa dinamarquesa', INR: 'Rupia indiana', BRL: 'Real brasileiro', ZAR: 'Rand sul-africano', NZD: 'Dólar da Nova Zelândia', SGD: 'Dólar de Singapura', HKD: 'Dólar de Hong Kong', MXN: 'Peso mexicano', RUB: 'Rublo russo', TRY: 'Lira turca' }
    },
    nl: {
  title: 'Converter',
  subtitle: 'Snelle valutaomrekeningen',
  heroTitle: 'Valutaconverter',
  navLangLabel: 'Taal',
  calculate: 'Berekenen',
      amount: 'Bedrag',
      positiveHint: 'Voer een positieve waarde in',
      from: 'Van',
      to: 'Naar',
      convert: 'Omrekenen',
      result: 'Resultaat',
      swap: 'Wissel valuta',
  currencies: { EUR: 'Euro', USD: 'Amerikaanse dollar', GBP: 'Britse pond', JPY: 'Japanse yen', CHF: 'Zwitserse frank', AUD: 'Australische dollar', CAD: 'Canadaanse dollar', CNY: 'Chinese yuan', SEK: 'Zweedse kroon', NOK: 'Noorse kroon', DKK: 'Deense kroon', INR: 'Indiaanse roepie', BRL: 'Braziliaanse real', ZAR: 'Zuid-Afrikaanse rand', NZD: 'Nieuw-Zeelandse dollar', SGD: 'Singapore dollar', HKD: 'Hongkong dollar', MXN: 'Mexicaanse peso', RUB: 'Russische roebel', TRY: 'Turkse lira' },
  rateSource: { live: 'Live', fallback: 'Fallback', cached: 'Gecached', local: 'Lokaal' }
    },
    ru: {
  title: 'Конвертер',
  subtitle: 'Быстрые конвертации валют',
  heroTitle: 'Конвертер',
  navLangLabel: 'Язык',
  calculate: 'Рассчитать',
      amount: 'Сумма',
      positiveHint: 'Введите положительное значение',
      from: 'Из',
      to: 'В',
      convert: 'Конвертировать',
      result: 'Результат',
      swap: 'Поменять валюты',
  currencies: { EUR: 'Евро', USD: 'Доллар США', GBP: 'Фунт стерлингов', JPY: 'Японская иена', CHF: 'Швейцарский франк', AUD: 'Австралийский доллар', CAD: 'Канадский доллар', CNY: 'Китайский юань', SEK: 'Шведская крона', NOK: 'Норвежская крона', DKK: 'Датская крона', INR: 'Индийская рупия', BRL: 'Бразильский реал', ZAR: 'Южноафриканский ранд', NZD: 'Доллар Новой Зеландии', SGD: 'Сингапурский доллар', HKD: 'Гонконгский доллар', MXN: 'Мексиканское песо', RUB: 'Российский рубль', TRY: 'Турецкая лира' },
  rateSource: { live: 'В реальном времени', fallback: 'Резерв', cached: 'Кеш', local: 'Локально' }
    },
    zh: {
  title: '转换器',
  subtitle: '快速货币转换',
  heroTitle: '货币转换器',
  navLangLabel: '语言',
  calculate: '计算',
      amount: '金额',
      positiveHint: '请输入正数',
      from: '从',
      to: '到',
      convert: '转换',
      result: '结果',
      swap: '切换货币',
  currencies: { EUR: '欧元', USD: '美元', GBP: '英镑', JPY: '日元', CHF: '瑞士法郎', AUD: '澳元', CAD: '加元', CNY: '人民币', SEK: '瑞典克朗', NOK: '挪威克朗', DKK: '丹麦克朗', INR: '印度卢比', BRL: '巴西雷亚尔', ZAR: '南非兰特', NZD: '新西兰元', SGD: '新加坡元', HKD: '港元', MXN: '墨西哥比索', RUB: '俄罗斯卢布', TRY: '土耳其里拉' },
  rateSource: { live: '实时', fallback: '后备', cached: '缓存', local: '本地' }
    },
    ja: {
  title: 'コンバータ',
  subtitle: '簡単な通貨換算',
  heroTitle: '通貨コンバータ',
  navLangLabel: '言語',
  calculate: '計算',
      amount: '金額',
      positiveHint: '正の値を入力してください',
      from: 'から',
      to: 'へ',
      convert: '変換',
      result: '結果',
      swap: '通貨を入れ替え',
  currencies: { EUR: 'ユーロ', USD: '米ドル', GBP: '英ポンド', JPY: '日本円', CHF: 'スイスフラン', AUD: '豪ドル', CAD: 'カナダドル', CNY: '人民元', SEK: 'スウェーデンクローナ', NOK: 'ノルウェークローネ', DKK: 'デンマーククローネ', INR: 'インドルピー', BRL: 'ブラジルレアル', ZAR: '南アフリカランド', NZD: 'ニュージーランドドル', SGD: 'シンガポールドル', HKD: '香港ドル', MXN: 'メキシコペソ', RUB: 'ロシアルーブル', TRY: 'トルコリラ' },
  rateSource: { live: 'ライブ', fallback: 'フォールバック', cached: 'キャッシュ', local: 'ローカル' }
    }
  };

  // helper to get currency name for current language, fallback to provided name
  getCurrencyName(code: string, fallback?: string) {
    try {
      const curObj = this.translations[this.current] && this.translations[this.current].currencies;
      return (curObj && curObj[code]) || fallback || code;
    } catch { return fallback || code }
  }

  current: Lang = 'en';
  // notify subscribers when language changes
  langChange: Subject<Lang> = new Subject();

  // map our Lang to an Intl locale identifier
  private localeMap: Record<Lang, string> = {
    en: 'en-US',
    de: 'de-DE',
    fr: 'fr-FR',
    es: 'es-ES',
    it: 'it-IT',
    pt: 'pt-PT',
    nl: 'nl-NL',
    ru: 'ru-RU',
    zh: 'zh-CN',
    ja: 'ja-JP'
  };

  constructor() {
  try { const saved = localStorage.getItem('converter:lang'); if (saved && (this.langs.find(l=>l.code===saved))) { this.current = saved as Lang } } catch {}
  // populate any missing currency full-names at runtime (non-blocking)
  void this.loadCurrencyNames();
  }

  set(lang: Lang) {
    if (!this.langs.find(l=>l.code===lang)) return;
    this.current = lang;
    try { localStorage.setItem('converter:lang', lang) } catch {}
  try { this.langChange.next(lang) } catch {}
  }

  // format a Date using the current language/locale
  formatDate(d?: Date|null): string {
    if (!d) return '';
    try {
      const locale = this.localeMap[this.current] || 'en-US';
      const opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Intl.DateTimeFormat(locale, opts).format(d);
    } catch { return d.toLocaleString() }
  }

  t(key: string): string {
    try {
      const parts = key.split('.');
      let obj: any = this.translations[this.current];
      for (const p of parts) {
        if (obj && obj.hasOwnProperty(p)) obj = obj[p]; else { obj = undefined; break }
      }
      if (obj !== undefined && obj !== null) return obj;
    } catch {}
    // fallback to english path
    try {
      const parts = key.split('.');
      let obj: any = this.translations['en'];
      for (const p of parts) {
        if (obj && obj.hasOwnProperty(p)) obj = obj[p]; else { obj = undefined; break }
      }
      if (obj !== undefined && obj !== null) return obj;
    } catch {}
    return key;
  }

  // Load canonical currency full names (English) and fill any missing
  // names for supported languages at runtime. Uses Umpirsky currency list.
  private async loadCurrencyNames(): Promise<void> {
    try {
      const url = 'https://raw.githubusercontent.com/umpirsky/currency-list/master/data/en/currency.json';
      const resp = await fetch(url);
      if (!resp.ok) return;
      const data: Record<string,string> = await resp.json();
      // ensure english currencies object exists
      if (!this.translations.en) this.translations.en = { currencies: {} };
      if (!this.translations.en.currencies) this.translations.en.currencies = {};

      for (const code of Object.keys(data)) {
        const canonical = data[code];
        // set english if missing
        if (!this.translations.en.currencies[code]) this.translations.en.currencies[code] = canonical;
        // ensure every configured language has at least this english name
        for (const l of this.langs) {
          const lang = l.code as string;
          try {
            if (!this.translations[lang]) continue;
            const cur = this.translations[lang].currencies;
            if (cur && !cur[code]) cur[code] = canonical;
          } catch { /* ignore individual language errors */ }
        }
      }
    } catch { /* silent fail - already many hard-coded names present */ }
  }
}
