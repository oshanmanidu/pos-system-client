import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingStatus } from './services/loading-status';
import { Loading } from './components/loading/loading';
import { AsyncPipe, NgIf } from '@angular/common'; // Import these


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loading, NgIf,AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pos-system-client');
  public statusService:LoadingStatus =inject(LoadingStatus);
}
