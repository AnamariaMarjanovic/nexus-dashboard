import { Injectable, signal } from '@angular/core';

export interface AppState {
  activeOrg: string;
}

const STATE_EVENT = 'nexus-state-change';

@Injectable({ providedIn: 'root' })
export class SharedStateService {
  activeOrg = signal<string>((window as any).__nexusState?.activeOrg ?? 'Acme Inc.');

  constructor() {
    (window as any).__nexusState = { activeOrg: this.activeOrg() };

    window.addEventListener(STATE_EVENT, (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail?.activeOrg && detail.activeOrg !== this.activeOrg()) {
        this.activeOrg.set(detail.activeOrg);
      }
    });
  }

  setActiveOrg(org: string) {
    this.activeOrg.set(org);
    (window as any).__nexusState = { activeOrg: org };
    window.dispatchEvent(new CustomEvent(STATE_EVENT, { detail: { activeOrg: org } }));
  }
}