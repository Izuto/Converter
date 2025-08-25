import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService, Rates } from './currency.service';
import { I18nService } from './i18n.service';
import { ConverterController } from './converter.controller';

@Component({
  selector: 'app-converter',
  template: `
  <div class="container">
    <p-card>
      <ng-template pTemplate="header">
        <div class="d-flex justify-content-between align-items-center">
          <div><strong>{{ i18n.t('heroTitle') }}</strong></div>
        </div>
      </ng-template>
      <div class="p-3">
        <!-- top columns: amount on left, (empty) right column for spacing -->
        <div class="row gx-4 mb-3">
          <div class="col-lg-6">
            <div class="mb-3">
              <!-- Use PrimeNG input with an inputStyleClass so we can style the raw input element -->
              <p-inputNumber [(ngModel)]="controller.amount" (ngModelChange)="onAmountChange()" [min]="0" [mode]="'decimal'" [useGrouping]="true" [showButtons]="false" inputId="amount" inputStyleClass="big-input" (keydown.enter)="controller.convert()"></p-inputNumber>
            </div>
          </div>
          <div class="col-lg-6">
            <!-- reserved for future content, keep layout balanced -->
          </div>
        </div>

        <!-- controls row: from select, swap, to select, calculate button (side-by-side) -->
        <div class="row mb-3">
          <div class="col-12">
            <div class="controls-row d-flex flex-wrap align-items-center gap-3">
              <div class="flex-grow-1 min-w-0">
                <p-dropdown [options]="currencyOptionsCached" [(ngModel)]="controller.from" (onChange)="onCurrencyChange()" optionValue="value" placeholder="{{i18n.t('from')}}" [scrollHeight]="'360px'" optionDisabled="disabled">
                  <ng-template let-opt pTemplate="selectedItem">
                    <span class="flag">{{ svc.getFlag(opt.value) }}</span><span class="sep"> </span>
                    <span class="code">{{ opt.value }}</span><span class="sep"> -</span>
                    <span class="name">{{ i18n.getCurrencyName(opt.value, svc.getInfo(opt.value).name) }}</span>
                  </ng-template>
                  <ng-template let-opt pTemplate="item">
                    <ng-container *ngIf="!opt.divider; else dividerTpl">
                      <div class="dropdown-item">
                        <span class="flag">{{ svc.getFlag(opt.value) }}</span><span class="sep"> </span>
                        <span class="code ms-2">{{ opt.value }}</span><span class="sep"> - </span>
                        <span class="name ms-2">{{ i18n.getCurrencyName(opt.value, svc.getInfo(opt.value).name) }}</span>
                      </div>
                    </ng-container>
                    <ng-template #dividerTpl>
                      <div class="dropdown-divider my-1" style="border-top:1px solid var(--p-dropdown-border, #e9ecef); margin:0.25rem 0;"></div>
                    </ng-template>
                  </ng-template>
                </p-dropdown>
              </div>

              <div>
                <button class="btn btn-outline-secondary swap-btn" (click)="controller.swap()" aria-label="Swap currencies">⇄</button>
              </div>

              <div class="flex-grow-1 min-w-0">
                <p-dropdown [options]="currencyOptionsCached" [(ngModel)]="controller.to" (onChange)="onCurrencyChange()" optionValue="value" placeholder="{{i18n.t('to')}}" [scrollHeight]="'360px'" optionDisabled="disabled">
                  <ng-template let-opt pTemplate="selectedItem">
                    <span class="flag">{{ svc.getFlag(opt.value) }}</span><span class="sep"> </span>
                    <span class="code">{{ opt.value }}</span><span class="sep"> - </span>
                    <span class="name">{{ i18n.getCurrencyName(opt.value, svc.getInfo(opt.value).name) }}</span>
                  </ng-template>
                  <ng-template let-opt pTemplate="item">
                    <div class="dropdown-item">
                      <span class="flag">{{ svc.getFlag(opt.value) }}</span><span class="sep"> </span>
                      <span class="code ms-2">{{ opt.value }}</span><span class="sep"> -</span>
                      <span class="name ms-2">{{ i18n.getCurrencyName(opt.value, svc.getInfo(opt.value).name) }}</span>
                    </div>
                  </ng-template>
                </p-dropdown>
              </div>

              <div>
                <button pButton type="button" class="p-button-rounded p-button-success btn-calc" (click)="controller.convert()" [disabled]="!controller.canConvert()" [attr.title]="i18n.t('calculate')">
                  <i *ngIf="controller.loading" class="pi pi-spin pi-spinner" aria-hidden="true"></i>
                  <i *ngIf="!controller.loading" class="pi pi-calculator" aria-hidden="true"></i>
                </button>
                <!-- <button pButton type="button" class="p-button-text btn-refresh ms-2" (click)="controller.forceRefresh()" [disabled]="controller.loading" title="Refresh live rates">Refresh rates</button> -->
              </div>
            </div>
          </div>
        </div>

        <!-- result full-width below -->
        <div class="row">
          <div class="col-12">
            <div class="result-box">
                  <ng-container *ngIf="singleResult !== null; else placeholder">
                    <div class="result-label">{{amount}} {{svc.getInfo(from).symbol}} {{from}} =</div>
                    <div class="result-value">{{svc.getInfo(to).symbol}} {{ singleResult | number:'1.2-6' }} <small class="text-muted">{{to}}</small></div>
                    <!-- <div class="text-muted mt-2">1 {{svc.getInfo(from).symbol}} {{from}} = {{svc.getInfo(to).symbol}} {{ baseRateSingle | number:'1.2-6' }} <small class="text-muted">{{to}}</small></div> -->
                    <div class="text-muted mt-2 small">
                      {{ controller.lastUpdated ? i18n.formatDate(controller.lastUpdated) : '' }}
                      <span *ngIf="controller.rateSource"> — {{ i18n.t('rateSource.' + controller.rateSource) }}</span>
                    </div>
                  </ng-container>
              <ng-template #placeholder>
                <div class="placeholder-text">{{ i18n.t('result') }}</div>
              </ng-template>
              <!-- debug panel removed -->
            </div>
          </div>
        </div>
      </div>
    </p-card>
  </div>
  `
  ,
  styles: [
    `
    .flag { font-size: 1.2em; margin-right: 0.4rem; }
    .dropdown-item { display:flex; align-items:center; }
    .code { font-weight: 600; }
    .name { color: var(--text-muted, #6c757d); margin-left: 0.4rem; }
    .big-input { font-size: 1.6rem; padding: 0.5rem; }
    `
  ]
})
export class ConverterComponent implements OnInit, OnDestroy {
  filterFrom = '';
  filterTo = '';
  currencyOptionsCached: { label: string, value: string }[] = [];
  // remember previous valid selections to revert if user picks a divider/empty option
  private prevFrom: string | null = null;
  private prevTo: string | null = null;
  private langSub: Subscription | null = null;
  private currenciesSub: Subscription | null = null;

  constructor(public svc: CurrencyService, public i18n: I18nService, public controller: ConverterController) {
  }

  get currencyKeys() { return Object.keys(this.controller.results || {}) }

  ngOnInit(): void {
  const build = () => {
    const favOrder = ['EUR','USD','GBP','JPY','RUB'];
    const all = this.controller.listCurrencies() || [];
    // favorites present in same order as favOrder
    const favItems = favOrder.filter(c => all.includes(c)).map(c => ({ label: this.svc.getFlag(c) + ' ' + c + ' - ' + this.i18n.getCurrencyName(c, this.svc.getInfo(c).name), value: c }));
    // remaining currencies (exclude favorites), sorted
    const remaining = all.filter(c => !favOrder.includes(c)).sort();
    const otherItems = remaining.map(c => ({ label: this.svc.getFlag(c) + ' ' + c + ' - ' + this.i18n.getCurrencyName(c, this.svc.getInfo(c).name), value: c }));
  // Insert a divider after favorites for visual separation
  const divider = { label: '', value: '', divider: true, disabled: true } as any;
  this.currencyOptionsCached = [...favItems, divider, ...otherItems];
  };
  build();
  // initialize previous selections after initial build
  this.prevFrom = this.controller.from;
  this.prevTo = this.controller.to;
  this.langSub = this.i18n.langChange.subscribe(() => build());
  this.currenciesSub = this.svc.currenciesChange.subscribe(() => build());
  }

  ngOnDestroy(): void {
    if (this.langSub) this.langSub.unsubscribe();
  if (this.currenciesSub) this.currenciesSub.unsubscribe();
  }

  onCurrencyChange() {
  // safety: ignore empty/divider selections and revert to previous valid selection
  if (!this.controller.from || this.controller.from === '') { this.controller.from = this.prevFrom || this.controller.from; return }
  if (!this.controller.to || this.controller.to === '') { this.controller.to = this.prevTo || this.controller.to; return }

  // if same currency selected, show immediate 1:1 result
  if (this.controller.from && this.controller.to && this.controller.from === this.controller.to) {
      this.controller.singleResult = this.controller.amount;
      this.controller.results = { [this.controller.to]: this.controller.amount } as any;
      this.controller.rateSource = 'local';
      this.controller.lastUpdated = new Date();
    } else {
      // when both currencies are set, trigger an automatic convert
      if (this.controller.from && this.controller.to && this.controller.canConvert()) {
        this.controller.convert();
      }
    }
  // update remembered valid selections
  this.prevFrom = this.controller.from;
  this.prevTo = this.controller.to;
  }

  onAmountChange() {
    if (this.controller.from && this.controller.to && this.controller.from === this.controller.to) {
      this.controller.singleResult = this.controller.amount;
      if (this.controller.results) this.controller.results[this.controller.to] = this.controller.amount;
    }
  }

  get singleResult() { return this.controller.singleResult }
  get amount() { return this.controller.amount }
  get from() { return this.controller.from }
  get to() { return this.controller.to }
  get results() { return this.controller.results }

  get perUnit(): number {
    if (!this.results || !this.to || !this.amount) return 0;
    const v = this.results[this.to];
    if (v === undefined || v === null || !Number.isFinite(v)) return 0;
    return v / this.amount;
  }
}
