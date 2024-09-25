import { Component } from '@angular/core';
import { StateService } from 'src/app/services/global-state/state.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  providers: [StateService]
})
export class CounterComponent {
  counter: number = 0;
  constructor(
    private stateService: StateService
  ) {
    this.stateService.currentCounter$.subscribe((value) => {
      this.counter = value;
    })
  }
  increment() {
    this.stateService.incrementCounter();
  }
}
