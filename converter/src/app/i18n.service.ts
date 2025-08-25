import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CurrencyService } from './currency.service';

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
  ,
  // additional / special codes
  XCG: 'Caribbean Guilder', XDR: 'Special Drawing Rights', VES: 'Venezuelan Bolívar (Sovereign)', TVD: 'Tuvalu Dollar', STN: 'São Tomé and Príncipe Dobra', SLE: 'Sierra Leonean Leone', MRU: 'Mauritanian Ouguiya', JEP: 'Jersey Pound', IMP: 'Manx Pound', KID: 'Kiribati Dollar', FOK: 'Faroese Króna', GGP: 'Guernsey Pound', ZWL: 'Zimbabwean Dollar'
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
  currencies: { EUR: 'Euro', USD: 'US-Dollar', GBP: 'Britisches Pfund', JPY: 'Japanischer Yen', CHF: 'Schweizer Franken', AUD: 'Australischer Dollar', CAD: 'Kanadischer Dollar', CNY: 'Chinesischer Yuan', SEK: 'Schwedische Krone', NOK: 'Norwegische Krone', DKK: 'Dänische Krone', INR: 'Indische Rupie', BRL: 'Brasilianischer Real', ZAR: 'Südafrikanischer Rand', NZD: 'Neuseeländischer Dollar', SGD: 'Singapur-Dollar', HKD: 'Hongkong-Dollar', MXN: 'Mexikanischer Peso', RUB: 'Russischer Rubel', TRY: 'Türkische Lira', ARS: 'Argentinischer Peso', BGN: 'Bulgarischer Lew', CLP: 'Chilenischer Peso', COP: 'Kolumbianischer Peso', EGP: 'Ägyptisches Pfund', ISK: 'Isländische Krone', KES: 'Kenyaische Schilling', KZT: 'Kasachischer Tenge', NGN: 'Nigerianische Naira', PHP: 'Philippinischer Peso', RON: 'Rumänischer Leu', UAH: 'Ukrainische Hrywnja', VND: 'Vietnamesischer Dong', TWD: 'Neuer Taiwan-Dollar', PKR: 'Pakistanische Rupie', LKR: 'Sri-Lanka-Rupie', BDT: 'Bangladeschische Taka', GEL: 'Georgischer Lari', HRK: 'Kroatische Kuna', MAD: 'Marokkanischer Dirham', PAB: 'Panamaischer Balboa', BHD: 'Bahrain-Dinar', KGS: 'Kirgisischer Som', KWD: 'Kuwait-Dinar', OMR: 'Omanischer Rial', QAR: 'Katar-Riyal',
    // special / regional codes
    XDR: 'Sonderziehungsrechte', XCG: 'Karibischer Gulden', VES: 'Venezolanischer Bolívar', TVD: 'Tuvalu-Dollar', STN: 'São-Tomé-und-Príncipe-Dobra', SLE: 'Sierra-leonischer Leone', MRU: 'Mauretanischer Ouguiya', KID: 'Kiribati-Dollar', JEP: 'Jersey-Pfund', IMP: 'Manx-Pfund', GGP: 'Guernsey-Pfund', FOK: 'Färöer-Króna'
  },
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
  currencies: { EUR: 'Euro', USD: 'Dollar américain', GBP: 'Livre sterling', JPY: 'Yen japonais', CHF: 'Franc suisse', AUD: 'Dollar australien', CAD: 'Dollar canadien', CNY: 'Yuan chinois', SEK: 'Couronne suédoise', NOK: 'Couronne norvégienne', DKK: 'Couronne danoise', INR: 'Roupie indienne', BRL: 'Real brésilien', ZAR: 'Rand sud-africain', NZD: 'Dollar néo-zélandais', SGD: 'Dollar de Singapour', HKD: 'Dollar de Hong Kong', MXN: 'Peso mexicain', RUB: 'Rouble russe', TRY: 'Livre turque', ARS: 'Peso argentin', BGN: 'Lev bulgare', CLP: 'Peso chilien', COP: 'Peso colombien', EGP: 'Livre égyptienne', ISK: 'Couronne islandaise', KES: 'Shilling kényan', KZT: 'Tenge kazakh', NGN: 'Naira nigériane', PHP: 'Peso philippin', RON: 'Leu roumain', UAH: 'Hryvnia ukrainienne', VND: 'Dong vietnamien', TWD: 'Nouveau dollar taïwanais', PKR: 'Roupie pakistanaise', LKR: 'Roupie sri-lankaise', BDT: 'Taka bangladais', GEL: 'Lari géorgien', HRK: 'Kuna croate', MAD: 'Dirham marocain', PAB: 'Balboa panaméen', BHD: 'Dinar bahreïni', KGS: 'Som kirghiz', KWD: 'Dinar koweïtien', OMR: 'Rial omanais', QAR: 'Riyal qatari',
    // special / regional codes
    XDR: 'Droits de tirage spéciaux', XCG: 'Guilder des Caraïbes', VES: 'Bolívar venezolano', TVD: 'Dollar de Tuvalu', STN: 'Dobra de São Tomé-et-Príncipe', SLE: 'Leone sierra-léonais', MRU: 'Ouguiya mauritanienne', KID: 'Dollar kiribatien', JEP: 'Livre de Jersey', IMP: 'Livre de l\'île de Man', GGP: 'Livre de Guernesey', FOK: 'Couronne féroïenne'
  },
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
  currencies: { EUR: 'Euro', USD: 'Dólar estadounidense', GBP: 'Libra esterlina', JPY: 'Yen japonés', CHF: 'Franco suizo', AUD: 'Dólar australiano', CAD: 'Dólar canadiense', CNY: 'Yuan chino', SEK: 'Corona sueca', NOK: 'Corona noruega', DKK: 'Corona danesa', INR: 'Rupia india', BRL: 'Real brasileño', ZAR: 'Rand sudafricano', NZD: 'Dólar neozelandés', SGD: 'Dólar de Singapur', HKD: 'Dólar de Hong Kong', MXN: 'Peso mexicano', RUB: 'Rublo ruso', TRY: 'Lira turca', ARS: 'Peso argentino', BGN: 'Lev búlgaro', CLP: 'Peso chileno', COP: 'Peso colombiano', EGP: 'Libra egipcia', ISK: 'Corona islandesa', KES: 'Chelín keniano', KZT: 'Tenge kazajo', NGN: 'Naira nigeriana', PHP: 'Peso filipino', RON: 'Leu rumano', UAH: 'Hryvnia ucraniana', VND: 'Dong vietnamita', TWD: 'Nuevo dólar de Taiwán', PKR: 'Rupia pakistaní', LKR: 'Rupia de Sri Lanka', BDT: 'Taka de Bangladés', GEL: 'Lari georgiano', HRK: 'Kuna croata', MAD: 'Dírham marroquí', PAB: 'Balboa panameño', BHD: 'Dinar bahreiní', KGS: 'Som kirguís', KWD: 'Dinar kuwaití', OMR: 'Rial omaní', QAR: 'Riyal qatarí',
    // special / regional codes
    XDR: 'Derechos Especiales de Giro', XCG: 'Guilder caribeño', VES: 'Bolívar venezolano', TVD: 'Dólar de Tuvalu', STN: 'Dobra de Santo Tomé y Príncipe', SLE: 'Leone de Sierra Leona', MRU: 'Ouguiya mauritana', KID: 'Dólar de Kiribati', JEP: 'Libra de Jersey', IMP: 'Libra de la Isla de Man', GGP: 'Libra de Guernsey', FOK: 'Corona feroesa'
  },
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
  currencies: { EUR: 'Euro', USD: 'Dollaro USA', GBP: 'Sterlina britannica', JPY: 'Yen giapponese', CHF: 'Franco svizzero', AUD: 'Dollaro australiano', CAD: 'Dollaro canadese', CNY: 'Yuan cinese', SEK: 'Corona svedese', NOK: 'Corona norvegese', DKK: 'Corona danese', INR: 'Rupia indiana', BRL: 'Real brasiliano', ZAR: 'Rand sudafricano', NZD: 'Dollaro della Nuova Zelanda', SGD: 'Dollaro di Singapore', HKD: 'Dollaro di Hong Kong', MXN: 'Peso messicano', RUB: 'Rublo russo', TRY: 'Lira turca', ARS: 'Peso argentino', BGN: 'Lev bulgaro', CLP: 'Peso cileno', COP: 'Peso colombiano', EGP: 'Lira egiziana', ISK: 'Corona islandese', KES: 'Scellino keniota', KZT: 'Tenge kazako', NGN: 'Naira nigeriana', PHP: 'Peso filippino', RON: 'Leu rumeno', UAH: 'Hryvnia ucraina', VND: 'Dong vietnamita', TWD: 'Nuovo dollaro di Taiwan', PKR: 'Rupia pachistana', LKR: 'Rupia dello Sri Lanka', BDT: 'Taka bengalese', GEL: 'Lari georgiano', HRK: 'Kuna croata', MAD: 'Dirham marocchino', PAB: 'Balboa panamense', BHD: 'Dinaro del Bahrein', KGS: 'Som kirghiso', KWD: 'Dinaro kuwaitiano', OMR: 'Rial omanita', QAR: 'Riyal qatari',
    // special / regional codes
    XDR: 'Diritti Speciali di Prelievo', XCG: 'Guilder dei Caraibi', VES: 'Bolívar venezuelano', TVD: 'Dollaro di Tuvalu', STN: 'Dobra di São Tomé e Príncipe', SLE: 'Leone della Sierra Leone', MRU: 'Ouguiya mauritana', KID: 'Dollaro di Kiribati', JEP: 'Sterlina di Jersey', IMP: 'Sterlina di Man', GGP: 'Sterlina di Guernsey', FOK: 'Corona delle Fær Øer'
  },
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
      currencies: { EUR: 'Euro', USD: 'Dólar americano', GBP: 'Libra esterlina', JPY: 'Iene giapponese', CHF: 'Franco suíço', AUD: 'Dólar australiano', CAD: 'Dólar canadense', CNY: 'Yuan chinês', SEK: 'Coroa sueca', NOK: 'Coroa norueguesa', DKK: 'Coroa dinamarquesa', INR: 'Rupia indiana', BRL: 'Real brasileiro', ZAR: 'Rand sul-africano', NZD: 'Dólar da Nova Zelândia', SGD: 'Dólar de Singapura', HKD: 'Dólar de Hong Kong', MXN: 'Peso mexicano', RUB: 'Rublo russo', TRY: 'Lira turca',
        // special / regional codes
        XDR: 'Direitos Especiais de Saque', XCG: 'Guilder caribenho', VES: 'Bolívar venezuelano', TVD: 'Dólar de Tuvalu', STN: 'Dobra de São Tomé e Príncipe', SLE: 'Leone da Serra Leoa', MRU: 'Ouguiya mauritana', KID: 'Dólar de Kiribati', JEP: 'Libra de Jersey', IMP: 'Libra da Ilha de Man', GGP: 'Libra de Guernsey', FOK: 'Coroa feroesa'
      }
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
  currencies: { EUR: 'Euro', USD: 'Amerikaanse dollar', GBP: 'Britse pond', JPY: 'Japanse yen', CHF: 'Zwitserse frank', AUD: 'Australische dollar', CAD: 'Canadaanse dollar', CNY: 'Chinese yuan', SEK: 'Zweedse kroon', NOK: 'Noorse kroon', DKK: 'Deense kroon', INR: 'Indiaanse roepie', BRL: 'Braziliaanse real', ZAR: 'Zuid-Afrikaanse rand', NZD: 'Nieuw-Zeelandse dollar', SGD: 'Singapore dollar', HKD: 'Hongkong dollar', MXN: 'Mexicaanse peso', RUB: 'Russische roebel', TRY: 'Turkse lira',
    // special / regional codes
    XDR: 'Speciale trekkingsrechten', XCG: 'Caribische gulden', VES: 'Venezolaanse bolívar', TVD: 'Tuvalu-dollar', STN: 'Dobra van São Tomé en Principe', SLE: 'Sierra Leoonse leone', MRU: 'Mauritaanse ouguiya', KID: 'Kiribati-dollar', JEP: 'Jersey-pond', IMP: 'Manx-pond', GGP: 'Guernsey-pond', FOK: 'Faeröer-krona'
  },
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
  currencies: { EUR: 'Евро', USD: 'Доллар США', GBP: 'Фунт стерлингов', JPY: 'Японская иена', CHF: 'Швейцарский франк', AUD: 'Австралийский доллар', CAD: 'Канадский доллар', CNY: 'Китайский юань', SEK: 'Шведская крона', NOK: 'Норвежская крона', DKK: 'Датская крона', INR: 'Индийская рупия', BRL: 'Бразильский реал', ZAR: 'Южноафриканский ранд', NZD: 'Доллар Новой Зеландии', SGD: 'Сингапурский доллар', HKD: 'Гонконгский доллар', MXN: 'Мексиканское песо', RUB: 'Российский рубль', TRY: 'Турецкая лира',
    // special / regional codes
    XDR: 'Специальные права заимствования', XCG: 'Карибский гульден', VES: 'Венесуэльский боливар', TVD: 'Доллар Тувалу', STN: 'Добра Сан-Томе и Принсипи', SLE: 'Сьерра-Леонский леоне', MRU: 'Мавританская угия', KID: 'Доллар Кирибати', JEP: 'Джерсийский фунт', IMP: 'Фунт острова Мэн', GGP: 'Гернсейский фунт', FOK: 'Фарерская крона'
  },
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
  currencies: { EUR: '欧元', USD: '美元', GBP: '英镑', JPY: '日元', CHF: '瑞士法郎', AUD: '澳元', CAD: '加元', CNY: '人民币', SEK: '瑞典克朗', NOK: '挪威克朗', DKK: '丹麦克朗', INR: '印度卢比', BRL: '巴西雷亚尔', ZAR: '南非兰特', NZD: '新西兰元', SGD: '新加坡元', HKD: '港元', MXN: '墨西哥比索', RUB: '俄罗斯卢布', TRY: '土耳其里拉',
    // special / regional codes
    XDR: '特别提款权', XCG: '加勒比古尔德', VES: '委内瑞拉玻利瓦尔', TVD: '图瓦卢元', STN: '圣多美和普林西比多布拉', SLE: '塞拉利昂利昂', MRU: '毛里塔尼亚乌吉亚', KID: '基里巴斯元', JEP: '泽西镑', IMP: '马恩岛镑', GGP: '根西镑', FOK: '法罗群岛克朗'
  },
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
  currencies: { EUR: 'ユーロ', USD: '米ドル', GBP: '英ポンド', JPY: '日本円', CHF: 'スイスフラン', AUD: '豪ドル', CAD: 'カナダドル', CNY: '人民元', SEK: 'スウェーデンクローナ', NOK: 'ノルウェークローネ', DKK: 'デンマーククローネ', INR: 'インドルピー', BRL: 'ブラジルレアル', ZAR: '南アフリカランド', NZD: 'ニュージーランドドル', SGD: 'シンガポールドル', HKD: '香港ドル', MXN: 'メキシコペソ', RUB: 'ロシアルーブル', TRY: 'トルコリラ',
    // special / regional codes
    XDR: '特殊引出権', XCG: 'カリブ・ギルダー', VES: 'ベネズエラ・ボリバル', TVD: 'ツバル・ドル', STN: 'サントメ・プリンシペ・ドブラ', SLE: 'シエラレオネ・レオン', MRU: 'モーリタニア・ウギーヤ', KID: 'キリバス・ドル', JEP: 'ジャージー・ポンド', IMP: 'マン島ポンド', GGP: 'ガーンジー・ポンド', FOK: 'フェロー諸島クローナ'
  },
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

  constructor(private currencySvc: CurrencyService) {
    try { const saved = localStorage.getItem('converter:lang'); if (saved && (this.langs.find(l=>l.code===saved))) { this.current = saved as Lang } } catch {}
    // populate any missing currency full-names at runtime (non-blocking)
    void this.loadCurrencyNames();

    // Ensure a small set of special / regional currency codes have canonical labels
    // in every configured language immediately so the UI doesn't show raw codes on first render.
    try {
      const extra: Record<string,string> = {
        XCG: 'Caribbean Guilder', XDR: 'Special Drawing Rights', VES: 'Venezuelan Bolívar (Sovereign)', TVD: 'Tuvalu Dollar', STN: 'São Tomé and Príncipe Dobra', SLE: 'Sierra Leonean Leone', MRU: 'Mauritanian Ouguiya', JEP: 'Jersey Pound', IMP: 'Manx Pound', KID: 'Kiribati Dollar', FOK: 'Faroese Króna', GGP: 'Guernsey Pound', ZWL: 'Zimbabwean Dollar'
      };
      for (const l of this.langs) {
        const code = l.code as string;
        try {
          if (!this.translations[code]) this.translations[code] = { currencies: {} } as any;
          if (!this.translations[code].currencies) this.translations[code].currencies = {};
          const cur = this.translations[code].currencies;
          for (const k of Object.keys(extra)) {
            if (!cur[k]) cur[k] = extra[k];
          }
        } catch {}
      }
    } catch {}

    // Ensure every language has at least a label for every currency code known to the app
    try {
      const seededEn = this.translations.en && this.translations.en.currencies ? this.translations.en.currencies : {};
      // gather codes from english seeds and from CurrencyService (fallbacks/meta)
      const codes = new Set<string>(Object.keys(seededEn));
      try {
        for (const c of (this.currencySvc.listCurrencies() || [])) codes.add(c);
      } catch {}
      for (const code of Array.from(codes)) {
        try {
          const enLabel = seededEn[code] || (this.currencySvc.getInfo ? this.currencySvc.getInfo(code).name : code) || code;
          if (!this.translations.en) this.translations.en = { currencies: {} } as any;
          if (!this.translations.en.currencies) this.translations.en.currencies = {};
          if (!this.translations.en.currencies[code]) this.translations.en.currencies[code] = enLabel;
          for (const l of this.langs) {
            const lang = l.code as string;
            try {
              if (!this.translations[lang]) this.translations[lang] = { currencies: {} } as any;
              if (!this.translations[lang].currencies) this.translations[lang].currencies = {};
              if (!this.translations[lang].currencies[code]) this.translations[lang].currencies[code] = enLabel;
            } catch {}
          }
        } catch {}
      }
    } catch {}
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

  // format a number according to the current language/locale
  formatNumber(n?: number|null, minimumFractionDigits: number = 2, maximumFractionDigits: number = 2): string {
    if (n === null || n === undefined) return '';
    try {
      const locale = this.localeMap[this.current] || 'en-US';
      const nf = new Intl.NumberFormat(locale, { minimumFractionDigits, maximumFractionDigits });
      return nf.format(Number(n));
    } catch {
      return String(n);
    }
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
      const base = 'https://raw.githubusercontent.com/umpirsky/currency-list/master/data';
      // fetch english canonical list first so we can fill fallbacks for all languages
      let english: Record<string,string> = {};
      try {
        const respEn = await fetch(`${base}/en/currency.json`);
        if (respEn.ok) {
          english = await respEn.json();
          if (!this.translations.en) this.translations.en = { currencies: {} } as any;
          if (!this.translations.en.currencies) this.translations.en.currencies = {};
          for (const code of Object.keys(english)) {
            if (!this.translations.en.currencies[code]) this.translations.en.currencies[code] = english[code];
          }
        }
      } catch {}

      // seed every language with the english canonical names as a fallback
      for (const l of this.langs) {
        const lang = l.code as string;
        try {
          if (!this.translations[lang]) this.translations[lang] = { currencies: {} } as any;
          if (!this.translations[lang].currencies) this.translations[lang].currencies = {};
          const cur = this.translations[lang].currencies;
          for (const code of Object.keys(english)) {
            if (!cur[code]) cur[code] = english[code];
          }
        } catch {}
      }

      // then try to fetch per-language lists and override seeded values where available
      const tasks = this.langs.map(l => (async () => {
        const lang = l.code as string;
        try {
          const url = `${base}/${lang}/currency.json`;
          const resp = await fetch(url);
          if (!resp.ok) return;
          const data: Record<string,string> = await resp.json();
          if (!this.translations[lang]) this.translations[lang] = { currencies: {} } as any;
          if (!this.translations[lang].currencies) this.translations[lang].currencies = {};
          const cur = this.translations[lang].currencies;
          for (const code of Object.keys(data)) {
            // override seeded english fallback
            cur[code] = data[code];
          }
        } catch {
          // ignore per-language failures
        }
      })());

      await Promise.allSettled(tasks);
    } catch {
      // silent fail - keep hard-coded translations and constructor-inserted extras
    }
  }
}
