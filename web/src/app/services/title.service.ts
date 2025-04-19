import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleSource = new BehaviorSubject<string>('');
  title$ = this.titleSource.asObservable();

  updateTitle(newTitle: string) {
    window.document.title = newTitle;
    this.titleSource.next(newTitle);
  }
}
