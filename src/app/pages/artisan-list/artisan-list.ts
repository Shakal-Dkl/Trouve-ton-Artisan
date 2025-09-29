import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artisan, ArtisanService } from '../../services/artisan';

@Component({
  selector: 'app-artisan-list',
  imports: [],
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

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService
  ) { }

  ngOnInit(): void {
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

}
