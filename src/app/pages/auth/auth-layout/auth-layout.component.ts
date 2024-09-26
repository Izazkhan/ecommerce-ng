import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StateService } from 'src/app/services/global-state/state.service';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['../../../../styles/auth-styles.scss', './auth-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [StateService]
})
export class AuthLayoutComponent {

}
