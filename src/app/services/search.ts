import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class Search {

  // Sujet pour stocker le terme de recherche actuel
  private searchTermSubject = new BehaviorSubject<string>('');
  
  // Observable public pour que les composants puissent s'abonner
  public searchTerm$ = this.searchTermSubject.asObservable();

  // Historique des recherches (stocké en mémoire)
  private searchHistory: string[] = [];

  constructor() { }

  /**
   * Met à jour le terme de recherche
   * @param term - Le nouveau terme de recherche
   */
  setSearchTerm(term: string): void {
    const cleanTerm = term.trim();
    this.searchTermSubject.next(cleanTerm);
    
    // Ajoute à l'historique si le terme n'est pas vide et pas déjà présent
    if (cleanTerm && !this.searchHistory.includes(cleanTerm)) {
      this.searchHistory.unshift(cleanTerm);
      
      // Limite l'historique à 10 éléments
      if (this.searchHistory.length > 10) {
        this.searchHistory = this.searchHistory.slice(0, 10);
      }
    }
  }

  /**
   * Récupère le terme de recherche actuel
   * @returns Le terme de recherche actuel
   */
  getCurrentSearchTerm(): string {
    return this.searchTermSubject.value;
  }

  /**
   * Efface le terme de recherche
   */
  clearSearchTerm(): void {
    this.searchTermSubject.next('');
  }

  /**
   * Récupère l'historique des recherches
   * @returns Tableau des recherches précédentes
   */
  getSearchHistory(): string[] {
    return [...this.searchHistory]; // Retourne une copie pour éviter les modifications
  }

  /**
   * Efface l'historique des recherches
   */
  clearSearchHistory(): void {
    this.searchHistory = [];
  }

  /**
   * Supprime un élément de l'historique
   * @param term - Le terme à supprimer
   */
  removeFromHistory(term: string): void {
    const index = this.searchHistory.indexOf(term);
    if (index > -1) {
      this.searchHistory.splice(index, 1);
    }
  }

  /**
   * Valide si un terme de recherche est valide
   * @param term - Le terme à valider
   * @returns true si le terme est valide
   */
  isValidSearchTerm(term: string): boolean {
    const cleanTerm = term.trim();
    return cleanTerm.length >= 2 && cleanTerm.length <= 50;
  }

  /**
   * Nettoie et normalise un terme de recherche
   * @param term - Le terme à nettoyer
   * @returns Le terme nettoyé
   */
  cleanSearchTerm(term: string): string {
    return term
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-ZÀ-ÿ0-9\s-]/g, '') // Supprime les caractères spéciaux sauf espaces et tirets
      .replace(/\s+/g, ' '); // Remplace les espaces multiples par un seul
  }
  
}
