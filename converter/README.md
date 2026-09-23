# Currency Converter App

A modern, responsive Angular-based currency converter with comprehensive global currency support and real-time exchange rates.

## ✨ Features

- **Real-time Exchange Rates**: Live data from open.er-api.com
- **60+ Currencies**: Comprehensive coverage of global currencies with proper symbols
- **Smart Currency Symbols**: Displays authentic currency symbols (€, £, ¥, ₹, $, etc.)
- **Flag Support**: Country flags for visual currency identification
- **Responsive Design**: Mobile-friendly interface using PrimeNG components
- **Dropdown Enhancement**: Improved UX with proper positioning and null-safety
- **PWA Ready**: Includes favicon and optimized build configuration

## 🌍 Currency Coverage

### Major Currencies
- USD ($), EUR (€), GBP (£), JPY (¥), CHF, CAD (C$), AUD (A$), NZD (NZ$)

### Regional Currencies
- **Asia Pacific**: CNY (¥), KRW (₩), INR (₹), THB (฿), SGD (S$), HKD (HK$)
- **Americas**: BRL (R$), MXN ($), ARS ($), CLP ($), BBD (Bds$), JMD (J$)
- **Europe**: SEK (kr), NOK (kr), PLN (zł), CZK (Kč), RUB (₽), TRY (₺)
- **Middle East**: SAR (﷼), AED (د.إ), ILS (₪), QAR (﷼), KWD (د.ك)
- **Africa**: ZAR (R), NGN (₦), EGP (£), KES (KSh), GHS (₵)

## 🔧 Technical Stack

### Core Framework
- **Angular 17.3.12**: Latest stable version with modern features
- **TypeScript 5.4.5**: Type-safe development
- **RxJS**: Reactive programming for data streams

### UI Components
- **PrimeNG 16.0.0**: Professional UI component library
- **PrimeIcons**: Icon set for enhanced visual design
- **Bootstrap 5.3.2**: CSS framework with SRI integrity verification

### Development Tools
- **Angular CLI**: Project scaffolding and build tools
- **Webpack Dev Server**: Hot reloading development environment
- **Karma + Jasmine**: Testing framework

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation & Development

```bash
# Clone the repository
git clone <repository-url>
cd converter

# Install dependencies
npm install

# Start development server
npm start
# or
ng serve --open

# Build for production
npm run build
# or
ng build --configuration production
```

The development server runs on `http://localhost:4200` by default.

## 📡 Data Sources

### Exchange Rate Provider
- **open.er-api.com** (Free, no API key required)
  - Base URL: `https://open.er-api.com/v6`
  - Endpoint: `/latest/EUR` (EUR as base currency)
  - Update frequency: Daily
  - Coverage: 170+ currencies

### Metadata Sources
- **Currency Names**: [Umpirsky currency list](https://github.com/umpirsky/currency-list)
  - Runtime fetch: `https://raw.githubusercontent.com/umpirsky/currency-list/master/data/en/currency.json`
- **Country Flags**: [mledoze/countries dataset](https://github.com/mledoze/countries)
  - Runtime fetch: `https://raw.githubusercontent.com/mledoze/countries/master/countries.json`

## 🏗️ Architecture

### Services
- **CurrencyService**: Core currency data management with symbols, flags, and rates
- **RateService**: Exchange rate fetching and caching
- **I18nService**: Internationalization and number formatting

### Components
- **AppComponent**: Main application shell
- **ConverterComponent**: Currency conversion interface with PrimeNG dropdowns

### Key Features Implementation
- **Symbol Mapping**: Comprehensive `CURRENCY_SYMBOLS` object with 60+ currency symbols
- **Flag Fallbacks**: Multi-tier flag resolution (built-in → API → emoji)
- **Rate Caching**: Local storage for offline functionality
- **Responsive Design**: Mobile-first approach with Bootstrap grid

## 🔧 Configuration

### Build Configurations
- **Development**: Hot reloading, source maps, debugging enabled
- **Production**: Minification, tree-shaking, optimized bundles
- **Testing**: Separate TypeScript config excluding test files

### Security Features
- **SRI (Subresource Integrity)**: Bootstrap CDN integrity verification
- **Content Security Policy**: Ready for CSP implementation
- **HTTPS Ready**: Production-ready security headers

## 🎨 UI Enhancements

### Recent Improvements
- ✅ **Dropdown UX**: Fixed positioning with `appendTo="body"`
- ✅ **Currency Symbols**: Proper symbols for all major currencies
- ✅ **Flag Coverage**: Expanded to 100+ currencies
- ✅ **Build Optimization**: Cleaned TypeScript configurations
- ✅ **PWA Assets**: Added favicon and app icons
- ✅ **Bootstrap Security**: Updated SRI hashes for integrity

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

### Development Guidelines
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- Follow Angular style guide
- Use TypeScript strict mode
- Include unit tests for new features
- Update documentation for API changes

### Adding New Currencies
Add entries to `src/app/currency.service.ts`:
```typescript
// In meta object
YourCurrency: { 
  code: 'XYZ', 
  name: 'Your Currency Name', 
  symbol: '¤', 
  flag: '🏳️' 
},

// In CURRENCY_SYMBOLS object (if not in meta)
XYZ: '¤'
```

## 📄 License & Attribution

### Third-Party Data
- **Exchange Rates**: [open.er-api.com](https://open.er-api.com) - Check their terms of service
- **Currency Names**: [Umpirsky](https://github.com/umpirsky/currency-list) - MIT License
- **Country Data**: [mledoze/countries](https://github.com/mledoze/countries) - Open Database License

### Dependencies
- Angular, PrimeNG, Bootstrap - See respective licenses
- All dependencies listed in `package.json` with their respective licenses

---

**Made with ❤️ using Angular and PrimeNG**
