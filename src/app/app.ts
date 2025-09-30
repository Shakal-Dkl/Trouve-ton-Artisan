import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header'; // Import du composant Header
import { Footer } from './components/footer/footer'; // Import du composant Footer

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer], // Ajout des composants dans imports
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('trouve-ton-artisan');
}
