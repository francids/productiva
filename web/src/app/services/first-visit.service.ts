import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirstVisitService {
  private readonly FIRST_VISIT_KEY = 'pm-first-visit';

  constructor() { }

  isFirstVisit(): boolean {
    return localStorage.getItem(this.FIRST_VISIT_KEY) !== 'false';
  }

  setVisited(): void {
    localStorage.setItem(this.FIRST_VISIT_KEY, 'false');
  }
}
