import { Component,OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtisanService } from '../../services/artisan';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {

  // Variable pour contrôler l'affichage du menu mobile
  isMenuOpen = false;

  // Terme de recherche
  searchTerm = '';
  
  // Les catégories pour le menu de navigation
  categories: string[] = [];

  constructor(
    private router: Router,
    private artisanService: ArtisanService // Changé de 'Artisan' vers 'ArtisanService'
  ) { }

  ngOnInit(): void {
    // Récupération des catégories pour le menu
    this.categories = this.artisanService.getCategories();
  }
  
  /**
   * Bascule l'affichage du menu mobile
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Ferme le menu mobile
   */
  closeMenu(): void {
    this.isMenuOpen = false;
  }

  /**
   * Navigation vers la page d'accueil
   */
  goHome(): void {
    this.router.navigate(['/']);
    this.closeMenu();
  }

  /**
   * Navigation vers une catégorie d'artisans
   * @param category - La catégorie sélectionnée
   */
  navigateToCategory(category: string): void {
    this.router.navigate(['/artisans'], { 
      queryParams: { category: category } 
    });
    this.closeMenu();
  }

  /**
   * Exécute la recherche
   */
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/artisans'], { 
        queryParams: { search: this.searchTerm.trim() } 
      });
      this.closeMenu();
    }
  }

  /**
   * Gère la touche Entrée dans le champ de recherche
   * @param event - L'événement clavier
   */
  onSearchKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  /**
   * Exécute la recherche
   */
  performSearch(): void {
    this.onSearch();
  }

}
