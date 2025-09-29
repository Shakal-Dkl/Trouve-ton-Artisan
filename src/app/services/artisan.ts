import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Interface pour typer nos données d'artisan
export interface Artisan {
  id: string;
  name: string;
  specialty: string;
  note: string;
  location: string;
  about: string;
  email: string;
  website: string;
  category: string;
  top: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {

  // Données des artisans (copiées du fichier JSON fourni)
  private artisans: Artisan[] = [
    {
      "id": "1",
      "name": "Vallis Bellemare",
      "specialty": "Plombier",
      "note": "4",
      "location": "Vienne",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "v.bellemare@gmail.com",
      "website": "https://plomberie-bellemare.com",
      "category": "Bâtiment",
      "top": false
    },
    {
      "id": "2",
      "name": "Amitee Lécuyer",
      "specialty": "Couturier",
      "note": "4.5",
      "location": "Annecy",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "a.amitee@hotmail.com",
      "website": "https://lecuyer-couture.com",
      "category": "Fabrication",
      "top": false
    },
    {
      "id": "3",
      "name": "Leala Dennis",
      "specialty": "Coiffeur",
      "note": "3.8",
      "location": "Chambéry",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "l.dennos@hotmail.fr",
      "website": "https://coiffure-leala-chambery.fr",
      "category": "Services",
      "top": false
    },
    {
      "id": "4",
      "name": "Chocolaterie Labbé",
      "specialty": "Chocolatier",
      "note": "4.9",
      "location": "Grenoble",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "chocolaterie-labbe@gmail.com",
      "website": "https://chocolaterie-labbe.fr",
      "category": "Alimentation",
      "top": true
    },
    {
      "id": "9",
      "name": "Orville Salmons",
      "specialty": "Chauffagiste",
      "note": "5",
      "location": "Evian",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "o-salmons@live.com",
      "website": "",
      "category": "Bâtiment",
      "top": true
    },
    {
      "id": "10",
      "name": "Au pain chaud",
      "specialty": "Boulanger",
      "note": "4.8",
      "location": "Montélimar",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "aupainchaud@hotmail.com",
      "website": "",
      "category": "Alimentation",
      "top": true
    }
    // Ajoutez ici les autres artisans du JSON...
  ];

  constructor() { }

  /**
   * Récupère tous les artisans
   * @returns Observable<Artisan[]>
   */
  getAllArtisans(): Observable<Artisan[]> {
    return of(this.artisans);
  }

  /**
   * Récupère un artisan par son ID
   * @param id - L'ID de l'artisan
   * @returns Observable<Artisan | undefined>
   */
  getArtisanById(id: string): Observable<Artisan | undefined> {
    const artisan = this.artisans.find(a => a.id === id);
    return of(artisan);
  }

  /**
   * Récupère les artisans par catégorie
   * @param category - La catégorie recherchée
   * @returns Observable<Artisan[]>
   */
  getArtisansByCategory(category: string): Observable<Artisan[]> {
    const filtered = this.artisans.filter(a => a.category === category);
    return of(filtered);
  }

  /**
   * Récupère les 3 artisans du mois (top = true)
   * @returns Observable<Artisan[]>
   */
  getTopArtisans(): Observable<Artisan[]> {
    const topArtisans = this.artisans.filter(a => a.top === true);
    return of(topArtisans.slice(0, 3)); // Limite à 3
  }

  /**
   * Recherche des artisans par nom, spécialité ou ville
   * @param searchTerm - Le terme de recherche
   * @returns Observable<Artisan[]>
   */
  searchArtisans(searchTerm: string): Observable<Artisan[]> {
    if (!searchTerm.trim()) {
      return of([]);
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = this.artisans.filter(artisan => 
      artisan.name.toLowerCase().includes(term) ||
      artisan.specialty.toLowerCase().includes(term) ||
      artisan.location.toLowerCase().includes(term)
    );
    
    return of(filtered);
  }

  /**
   * Récupère les catégories disponibles
   * @returns string[]
   */
  getCategories(): string[] {
    const categories = [...new Set(this.artisans.map(a => a.category))];
    return categories.sort();
  }
}
  

