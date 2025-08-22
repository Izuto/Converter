import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdsService {
  private injected = false;

  constructor() {}

  shouldInject(): boolean {
    // Require production build + non-localhost domain
    if (!environment || !environment.production) return false;
    try {
      const host = location.hostname;
      if (!host) return false;
      if (host === 'localhost' || host === '127.0.0.1') return false;
      // allow domain-like hosts (simple check)
      return host.indexOf('.') !== -1 && host.indexOf('local') === -1;
    } catch {
      return false;
    }
  }

  injectAdSense(publisherId: string) {
    if (this.injected) return;
    if (!this.shouldInject()) return;
    try {
      const s = document.createElement('script');
      s.async = true;
      s.setAttribute('data-ad-client', publisherId);
      s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      document.head.appendChild(s);
      this.injected = true;
    } catch (e) {
      // fail silently
      console.error('AdsService: failed to inject AdSense script', e);
    }
  }
}
