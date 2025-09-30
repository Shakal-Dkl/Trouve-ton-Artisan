import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Pour routerLink et queryParams

@Component({
  selector: 'app-not-found',
  imports: [CommonModule, RouterModule], // Ajout des modules nécessaires
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound {
  // Propriété pour contrôler l'affichage de l'image personnalisée
  hasCustomImage = false;
}
