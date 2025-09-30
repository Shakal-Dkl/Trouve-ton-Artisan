import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Artisan, ArtisanService } from '../../services/artisan';
import { ArtisanCard } from '../../components/artisan-card/artisan-card';
import { SearchBar } from '../../components/search-bar/search-bar';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ArtisanCard, SearchBar],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home implements OnInit {

  // Les 3 artisans du mois
  topArtisans: Artisan[] = [];
  
  // État de chargement
  isLoading = true;

  constructor(
    private artisanService: ArtisanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Chargement des artisans du mois
    this.loadTopArtisans();
  }

  /**
   * Charge les artisans du mois
   */
  private loadTopArtisans(): void {
    this.artisanService.getTopArtisans().subscribe({
      next: (artisans) => {
        this.topArtisans = artisans;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des artisans:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Navigation vers une catégorie
   * @param category - La catégorie sélectionnée
   */
  navigateToCategory(category: string): void {
    this.router.navigate(['/artisans'], { 
      queryParams: { category: category } 
    });
  }

  /**
   * Gestion de la recherche depuis la barre de recherche
   * @param searchResult - Le résultat de la recherche
   */
  onSearch(searchResult: any): void {
    this.router.navigate(['/artisans'], { 
      queryParams: { search: searchResult.term } 
    });
  }

}
