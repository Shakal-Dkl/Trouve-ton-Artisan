import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map, tap } from 'rxjs';

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
  // Données complètes des artisans
  private staticData: Artisan[] = [
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
      "id": "5",
      "name": "Claude Quinn",
      "specialty": "Bijoutier",
      "note": "4.2",
      "location": "Aix-les-bains",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "claude.quinn@gmail.com",
      "website": "",
      "category": "Fabrication",
      "top": false
    },
    {
      "id": "6",
      "name": "Valérie Laderoute",
      "specialty": "Toiletteur",
      "note": "4.5",
      "location": "Valence",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "v-laredoute@gmail.com",
      "website": "",
      "category": "Services",
      "top": false
    },
    {
      "id": "7",
      "name": "Boutot & fils",
      "specialty": "Menuisier",
      "note": "4.7",
      "location": "Bourg-en-bresse",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "boutot-menuiserie@gmail.com",
      "website": "https://boutot-menuiserie.com",
      "category": "Bâtiment",
      "top": false
    },
    {
      "id": "8",
      "name": "CM Graphisme",
      "specialty": "Webdesign",
      "note": "4.4",
      "location": "Valence",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "contact@cm-graphisme.com",
      "website": "https://cm-graphisme.com",
      "category": "Services",
      "top": false
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
    },
    {
      "id": "11",
      "name": "Boucherie Dumont",
      "specialty": "Boucher",
      "note": "4.5",
      "location": "Lyon",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "boucherie.dumond@gmail.com",
      "website": "",
      "category": "Alimentation",
      "top": false
    },
    {
      "id": "12",
      "name": "Mont Blanc Eléctricité",
      "specialty": "Electricien",
      "note": "4.5",
      "location": "Chamonix",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "contact@mont-blanc-electricite.com",
      "website": "https://mont-blanc-electricite.com",
      "category": "Bâtiment",
      "top": false
    },
    {
      "id": "13",
      "name": "Traiteur Truchon",
      "specialty": "Traiteur",
      "note": "4.1",
      "location": "Privas",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "contact@truchon-traiteur.fr",
      "website": "https://truchon-traiteur.fr",
      "category": "Bâtiment",
      "top": false
    },
    {
      "id": "14",
      "name": "Le monde des fleurs",
      "specialty": "Fleuriste",
      "note": "4.6",
      "location": "Annonay",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "contact@le-monde-des-fleurs-annonay.fr",
      "website": "https://le-monde-des-fleurs-annonay.fr",
      "category": "Services",
      "top": false
    },
    {
      "id": "15",
      "name": "Royden Charbonneau",
      "specialty": "Carrossier",
      "note": "3.8",
      "location": "Saint-Priest",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "r.charbonneau@gmail.com",
      "website": "",
      "category": "Services",
      "top": false
    },
    {
      "id": "16",
      "name": "Ernest Carignan",
      "specialty": "Ferronier",
      "note": "5",
      "location": "Le Puy-en-Velay",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "e-carigan@hotmail.com",
      "website": "",
      "category": "Fabrication",
      "top": false
    },
    {
      "id": "17",
      "name": "C'est sup'hair",
      "specialty": "Coiffeur",
      "note": "4.1",
      "location": "Romans-sur-Isère",
      "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.",
      "email": "sup-hair@gmail.com",
      "website": "https://sup-hair.fr",
      "category": "Services",
      "top": false
    }
  ];

  constructor() { }

  /**
   * Récupère tous les artisans (version statique temporaire)
   * @returns Observable<Artisan[]>
   */
  getAllArtisans(): Observable<Artisan[]> {
    return of(this.staticData);
  }

  /**
   * Récupère un artisan par son ID
   * @param id - L'ID de l'artisan
   * @returns Observable<Artisan | undefined>
   */
  getArtisanById(id: string): Observable<Artisan | undefined> {
    return this.getAllArtisans().pipe(
      map(artisans => artisans.find(a => a.id === id)),
      catchError(error => {
        console.error('Erreur lors du chargement de l\'artisan:', error);
        return of(undefined);
      })
    );
  }

  /**
   * Récupère les artisans par catégorie
   * @param category - La catégorie recherchée
   * @returns Observable<Artisan[]>
   */
  getArtisansByCategory(category: string): Observable<Artisan[]> {
    return this.getAllArtisans().pipe(
      map(artisans => artisans.filter(a => a.category === category)),
      catchError(error => {
        console.error('Erreur lors du chargement des artisans par catégorie:', error);
        return of([]);
      })
    );
  }

  /**
   * Récupère les artisans du mois (top = true)
   * @returns Observable<Artisan[]>
   */
  getTopArtisans(): Observable<Artisan[]> {
    return this.getAllArtisans().pipe(
      map(artisans => artisans.filter(a => a.top === true)),
      catchError(error => {
        console.error('Erreur lors du chargement des artisans top:', error);
        return of([]);
      })
    );
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
    
    return this.getAllArtisans().pipe(
      map(artisans => artisans.filter(artisan =>
        artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artisan.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artisan.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artisan.about.toLowerCase().includes(searchTerm.toLowerCase())
      )),
      catchError(error => {
        console.error('Erreur lors de la recherche d\'artisans:', error);
        return of([]);
      })
    );
  }

  /**
   * Récupère les catégories disponibles
   * @returns Observable<string[]>
   */
  getCategories(): Observable<string[]> {
    return this.getAllArtisans().pipe(
      map(artisans => {
        const categories = [...new Set(artisans.map(a => a.category))];
        return categories.sort();
      }),
      catchError(error => {
        console.error('Erreur lors du chargement des catégories:', error);
        return of([]);
      })
    );
  }

  /**
   * Force le rechargement des données (version statique)
   * @returns Observable<Artisan[]>
   */
  refreshData(): Observable<Artisan[]> {
    return this.getAllArtisans();
  }
}