import { Component, OnInit } from '@angular/core';
import { AdsService } from './ads.service';
import { I18nService, Lang } from './i18n.service';

// Render the converter component directly so the app shows the converter UI by default.
@Component({
  selector: 'app-root',
  template: `
  <header class="topbar">
    <div class="container topbar-inner">
      <div class="brand">{{ i18n.t('title') }}</div>
      <div class="lang-select">
        <label class="visually-hidden">{{ i18n.t('navLangLabel') }}</label>
        <p-dropdown [options]="i18n.langs" optionLabel="name" optionValue="code" [(ngModel)]="currentLang" (onChange)="onLangChange($event.value)">
          <ng-template let-l pTemplate="item">
            <div class="p-clearfix">
              <span style="margin-right:8px">{{ l.flag }}</span>
              <span>{{ l.name }}</span>
            </div>
          </ng-template>
          <ng-template let-l pTemplate="selectedItem">
            <div class="p-clearfix">
              <span style="margin-right:8px">{{ l.flag }}</span>
              <span>{{ l.name }}</span>
            </div>
          </ng-template>
        </p-dropdown>
      </div>
    </div>
  </header>
  <main class="app-main">
    <div class="container">
      <app-converter></app-converter>
    </div>
  </main>
  `
})
export class AppComponent implements OnInit {
  currentLang: Lang;

  constructor(private ads: AdsService, public i18n: I18nService) {
    this.currentLang = this.i18n.current;
  }

  ngOnInit(): void {
    // keep local value in sync when other parts change language
    this.i18n.langChange.subscribe((l) => this.currentLang = l);
    // inject AdSense script only when running on a non-localhost domain and production build
    this.ads.injectAdSense('ca-pub-4530638601114994');
  }

  onLangChange(lang: string) {
    this.i18n.set(lang as Lang);
  }
}
