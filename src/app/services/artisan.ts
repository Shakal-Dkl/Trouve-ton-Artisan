import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private dataUrl = '/datas.json';
  private artisansCache: Artisan[] | null = null;

  constructor(private http: HttpClient) {}

  private loadArtisans(): Observable<Artisan[]> {
    if (this.artisansCache) {
      return of(this.artisansCache);
    }
    
    return this.http.get<Artisan[]>(this.dataUrl).pipe(
      tap(data => {
        this.artisansCache = data;
      }),
      catchError(error => {
        console.error(' Erreur AJAX:', error);
        return of(this.fallbackData);
      })
    );
  }

  private fallbackData: Artisan[] = [
    {
      id: "1",
      name: "Vallis Bellemare",
      specialty: "Plombier",
      note: "4",
      location: "Vienne",
      about: "Lorem ipsum dolor sit amet...",
      email: "v.bellemare@gmail.com",
      website: "https://plomberie-bellemare.com",
      category: "Bâtiment",
      top: false
    }
  ];

  getAllArtisans(): Observable<Artisan[]> {
    return this.loadArtisans();
  }

  getArtisanById(id: string): Observable<Artisan | undefined> {
    return this.getAllArtisans().pipe(
      map(artisans => artisans.find(a => a.id === id))
    );
  }

  getArtisansByCategory(category: string): Observable<Artisan[]> {
    return this.getAllArtisans().pipe(
      map(artisans => artisans.filter(a => a.category === category))
    );
  }

  getTopArtisans(): Observable<Artisan[]> {
    return this.getAllArtisans().pipe(
      map(artisans => artisans.filter(a => a.top === true))
    );
  }

  searchArtisans(searchTerm: string): Observable<Artisan[]> {
    if (!searchTerm.trim()) {
      return this.getAllArtisans();
    }
    const term = searchTerm.toLowerCase().trim();
    return this.getAllArtisans().pipe(
      map(artisans => artisans.filter(a => 
        a.name.toLowerCase().includes(term) || 
        a.specialty.toLowerCase().includes(term) ||
        a.location.toLowerCase().includes(term)
      ))
    );
  }

  getCategories(): Observable<string[]> {
    return this.getAllArtisans().pipe(
      map(artisans => {
        const categories = artisans.map(a => a.category);
        return [...new Set(categories)].sort();
      })
    );
  }

  refreshData(): Observable<Artisan[]> {
    this.artisansCache = null;
    return this.loadArtisans();
  }
}
