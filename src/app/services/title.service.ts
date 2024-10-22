import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleSource = new BehaviorSubject<string>('');
  title$ = this.titleSource.asObservable();

  updateTitle(newTitle: string) {
    this.titleSource.next(newTitle);
  }
}
