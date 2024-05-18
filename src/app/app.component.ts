import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div
      class="navbar rounded-b-md bg-gradient-to-r from-blue-400 via-blue-700 to-indigo-600 px-2 py-0 shadow-lg"
    >
      <p class="my-auto text-4xl font-bold text-white underline">Todo App</p>
    </div>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {}
