import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Artisan, ArtisanService } from '../../services/artisan';
import { ArtisanCard } from '../../components/artisan-card/artisan-card';
import { SearchBar } from '../../components/search-bar/search-bar';

@Component({
  selector: 'app-artisan-list',
  imports: [CommonModule, ArtisanCard, SearchBar],
  templateUrl: './artisan-list.html',
  styleUrl: './artisan-list.scss'
})


export class ArtisanList implements OnInit {

  // Liste des artisans à afficher
  artisans: Artisan[] = [];
  
  // État de chargement
  isLoading = true;
  
  // Titre de la page (dépend de la recherche/catégorie)
  pageTitle = 'Artisans';
  
  // Filtres appliqués
  currentCategory = '';
  currentSearch = '';
  
  // Liste des catégories disponibles
  categories: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService
  ) { }

  ngOnInit(): void {
    // Récupération des catégories disponibles
    this.categories = this.artisanService.getCategories();
    
    // Écoute des changements dans les paramètres de l'URL
    this.route.queryParams.subscribe(params => {
      this.currentCategory = params['category'] || '';
      this.currentSearch = params['search'] || '';
      
      this.loadArtisans();
    });
  }

  /**
   * Charge les artisans selon les filtres
   */
  private loadArtisans(): void {
    this.isLoading = true;

    if (this.currentSearch) {
      // Recherche par terme
      this.pageTitle = `Résultats pour "${this.currentSearch}"`;
      this.artisanService.searchArtisans(this.currentSearch).subscribe({
        next: (artisans) => {
          this.artisans = artisans;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la recherche:', error);
          this.isLoading = false;
        }
      });
    } else if (this.currentCategory) {
      // Filtrage par catégorie
      this.pageTitle = `Artisans - ${this.currentCategory}`;
      this.artisanService.getArtisansByCategory(this.currentCategory).subscribe({
        next: (artisans) => {
          this.artisans = artisans;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement par catégorie:', error);
          this.isLoading = false;
        }
      });
    } else {
      // Affichage de tous les artisans
      this.pageTitle = 'Tous les artisans';
      this.artisanService.getAllArtisans().subscribe({
        next: (artisans) => {
          this.artisans = artisans;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement:', error);
          this.isLoading = false;
        }
      });
    }
  }

  /**
   * Retourne le nombre d'artisans trouvés
   */
  get artisanCount(): number {
    return this.artisans.length;
  }

  /**
   * Gestion de la recherche depuis la barre de recherche
   * @param searchResult - Le résultat de la recherche
   */
  onSearch(searchResult: any): void {
    this.currentSearch = searchResult.term;
    this.loadArtisans();
  }

  /**
   * Filtre par catégorie
   * @param category - La catégorie à filtrer
   */
  filterByCategory(category: string): void {
    this.currentCategory = category;
    this.currentSearch = '';
    this.loadArtisans();
  }

}
