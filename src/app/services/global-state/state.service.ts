import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StateService {
  private counterSource = new BehaviorSubject<number>(0);
  currentCounter$ = this.counterSource.asObservable();

  incrementCounter() {
    this.counterSource.next(this.counterSource.value + 1);
  }

  decrementCounter() {
    this.counterSource.next(this.counterSource.value + 1);
  }

}
