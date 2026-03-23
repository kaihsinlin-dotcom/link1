import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Technician Assignment Planner';

  navLinks = [
    { path: '/runs', label: 'Runs', icon: 'play_circle' },
    { path: '/parameter-sets', label: 'Parameter Sets', icon: 'tune' },
  ];
}
