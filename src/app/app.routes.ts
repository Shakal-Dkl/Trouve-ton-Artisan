import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Home } from './pages/home/home';
import { ArtisanList } from './pages/artisan-list/artisan-list';
import { ArtisanDetail } from './pages/artisan-detail/artisan-detail';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [

    // Page d'accueil
  { 
    path: '', 
    component: Home,
    data: { 
      title: 'Accueil - Trouve ton artisan',
      description: 'Trouvez facilement un artisan en Auvergne-Rhône-Alpes. Plus de 221 000 artisans qualifiés à votre service.'
    }
  },
  
  // Liste des artisans (avec possibilité de filtres)
  { 
    path: 'artisans', 
    component: ArtisanList,
    data: { 
      title: 'Artisans - Trouve ton artisan',
      description: 'Découvrez notre sélection d\'artisans qualifiés en Auvergne-Rhône-Alpes par catégorie ou recherche.'
    }
  },
  
  // Détail d'un artisan
  { 
    path: 'artisan/:id', 
    component: ArtisanDetail,
    data: { 
      title: 'Détail artisan - Trouve ton artisan',
      description: 'Contactez directement votre artisan et obtenez une réponse sous 48h.'
    }
  },
  
  // Pages légales (vides pour l'instant comme demandé)
  { 
    path: 'mentions-legales', 
    component: NotFound,
    data: { title: 'Mentions légales - Trouve ton artisan' }
  },
  { 
    path: 'donnees-personnelles', 
    component: NotFound,
    data: { title: 'Données personnelles - Trouve ton artisan' }
  },
  { 
    path: 'accessibilite', 
    component: NotFound,
    data: { title: 'Accessibilité - Trouve ton artisan' }
  },
  { 
    path: 'cookies', 
    component: NotFound,
    data: { title: 'Cookies - Trouve ton artisan' }
  },
  
  // Page 404 explicite
  { 
    path: '404', 
    component: NotFound,
    data: { 
      title: 'Page non trouvée - Trouve ton artisan',
      description: 'La page que vous recherchez n\'existe pas.'
    }
  },
  
  // Redirection de toutes les autres routes vers 404
  { 
    path: '**', 
    component: NotFound,
    data: { 
      title: 'Page non trouvée - Trouve ton artisan',
      description: 'La page que vous recherchez n\'existe pas.'
    }
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Options pour améliorer l'expérience utilisateur
    scrollPositionRestoration: 'top', // Retourne en haut de page lors de la navigation
    enableTracing: false, // Mettre à true pour déboguer le routing
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
