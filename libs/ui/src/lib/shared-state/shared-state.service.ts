import { Injectable, signal } from "@angular/core";

export interface AppState {
  activeOrg: string;
}

const STATE_EVENT = 'nexus-state-change';

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {
  activeOrg = signal<string>('Acme Inc.');

  constructor() {
    // Expose current state on window for cross-framework (react-Angular) access/communication
    (window as any).__nexusState = {
      activeOrg: this.activeOrg()
    };
  }

  setActiveOrg(newOrg: string) {
    this.activeOrg.set(newOrg);
    (window as any).__nexusState.activeOrg = newOrg;
    window.dispatchEvent(new CustomEvent(STATE_EVENT, { detail: { activeOrg: newOrg } }));
  }
}