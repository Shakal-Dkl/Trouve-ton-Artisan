import { Component,OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import pour *ngFor et *ngIf
import { Artisan } from '../../services/artisan';

@Component({
  selector: 'app-artisan-card',
  imports: [CommonModule, RouterModule], // Ajout de RouterModule
  templateUrl: './artisan-card.html',
  styleUrl: './artisan-card.scss'
})

export class ArtisanCard implements OnInit {

  // L'artisan à afficher (reçu du composant parent)
  @Input() artisan!: Artisan;
  
  // Tableau pour afficher les étoiles
  stars: boolean[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Calcul des étoiles à afficher
    this.calculateStars();
  }

  /**
   * Calcule quelles étoiles afficher selon la note
   */
  private calculateStars(): void {
    const rating = parseFloat(this.artisan.note);
    this.stars = [];
    
    // Génère un tableau de 5 étoiles (true = remplie, false = vide)
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i <= rating);
    }
  }

  /**
   * Navigation vers le détail de l'artisan
   */
  goToDetail(): void {
    this.router.navigate(['/artisan', this.artisan.id]);
  }

  /**
   * Gère le clic sur la carte avec le clavier (accessibilité)
   * @param event - L'événement clavier
   */
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.goToDetail();
    }
  }

}
