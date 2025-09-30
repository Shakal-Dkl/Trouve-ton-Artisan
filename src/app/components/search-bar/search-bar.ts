import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Search } from '../../services/search';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})



export class SearchBar implements OnInit, OnDestroy {

  // Propriétés d'entrée
  @Input() placeholder = 'Rechercher un artisan...';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showHistory = true;
  @Input() debounceTime = 300;

  // Événements de sortie
  @Output() search = new EventEmitter<string>();
  @Output() searchResult = new EventEmitter<any>();
  @Output() clear = new EventEmitter<void>();

  // Variables du composant
  searchTerm = '';
  showSearchHistory = false;
  searchHistory: string[] = [];
  isSearching = false;
  suggestions: string[] = [];
  showSuggestions = false;
  
  // Subject pour gérer le debounce de la recherche
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private searchService: Search) { }

  ngOnInit(): void {
    // Configuration du debounce pour la recherche en temps réel
    this.searchSubject
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(term => {
        this.performSearchInternal(term);
      });

    // Récupération de l'historique des recherches
    this.loadSearchHistory();

    // Abonnement aux changements du terme de recherche global
    this.searchService.searchTerm$
      .pipe(takeUntil(this.destroy$))
      .subscribe(term => {
        if (term !== this.searchTerm) {
          this.searchTerm = term;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Gère la saisie dans le champ de recherche
   * @param event - L'événement de saisie
   */
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const term = target.value;
    this.searchTerm = term;
    
    // Émet le terme de recherche avec debounce
    this.searchSubject.next(term);
  }

  /**
   * Gère l'appui sur les touches
   * @param event - L'événement clavier
   */
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.performSearchInternal(this.searchTerm);
      this.hideSearchHistory();
    } else if (event.key === 'Escape') {
      this.clearSearch();
      this.hideSearchHistory();
    } else if (event.key === 'ArrowDown' && this.showSearchHistory) {
      // Navigation dans l'historique avec les flèches (à implémenter si nécessaire)
      event.preventDefault();
    }
  }

  /**
   * Exécute la recherche (méthode publique pour le formulaire)
   */
  public performSearch(): void {
    this.performSearchInternal(this.searchTerm);
  }

  /**
   * Exécute la recherche interne
   * @param term - Le terme de recherche
   */
  private performSearchInternal(term: string): void {
    const cleanTerm = this.searchService.cleanSearchTerm(term);
    
    if (this.searchService.isValidSearchTerm(cleanTerm)) {
      this.searchService.setSearchTerm(cleanTerm);
      this.search.emit(cleanTerm);
      this.searchResult.emit({ term: cleanTerm });
      this.hideSearchHistory();
    } else if (cleanTerm === '') {
      this.clearSearch();
    }
  }

  /**
   * Gère les changements d'input
   * @param event - L'événement d'input
   */
  public onInputChange(event: any): void {
    const term = event.target.value;
    this.searchSubject.next(term);
  }

  /**
   * Sélectionne une suggestion
   * @param suggestion - La suggestion sélectionnée
   */
  public selectSuggestion(suggestion: string): void {
    this.searchTerm = suggestion;
    this.performSearchInternal(suggestion);
    this.showSuggestions = false;
  }

  /**
   * Efface la recherche
   */
  clearSearch(): void {
    this.searchTerm = '';
    this.searchService.clearSearchTerm();
    this.clear.emit();
    this.hideSearchHistory();
  }

  /**
   * Affiche l'historique des recherches
   */
  showSearchHistoryDropdown(): void {
    if (this.showHistory) {
      this.loadSearchHistory();
      this.showSearchHistory = this.searchHistory.length > 0;
    }
  }

  /**
   * Cache l'historique des recherches
   */
  hideSearchHistory(): void {
    // Petit délai pour permettre le clic sur les éléments de l'historique
    setTimeout(() => {
      this.showSearchHistory = false;
    }, 150);
  }

  /**
   * Sélectionne un terme de l'historique
   * @param term - Le terme sélectionné
   */
  selectHistoryTerm(term: string): void {
    this.searchTerm = term;
    this.performSearchInternal(term);
  }

  /**
   * Supprime un terme de l'historique
   * @param term - Le terme à supprimer
   * @param event - L'événement (pour empêcher la propagation)
   */
  removeHistoryTerm(term: string, event: Event): void {
    event.stopPropagation();
    this.searchService.removeFromHistory(term);
    this.loadSearchHistory();
  }

  /**
   * Charge l'historique des recherches
   */
  private loadSearchHistory(): void {
    this.searchHistory = this.searchService.getSearchHistory();
  }

  /**
   * Retourne les classes CSS pour la taille
   */
  get sizeClass(): string {
    switch (this.size) {
      case 'sm': return 'form-control-sm';
      case 'lg': return 'form-control-lg';
      default: return '';
    }
  }

}
