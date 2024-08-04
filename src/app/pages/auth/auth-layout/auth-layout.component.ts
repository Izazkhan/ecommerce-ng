import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['../../../../styles/auth-styles.scss', './auth-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLayoutComponent {

}
