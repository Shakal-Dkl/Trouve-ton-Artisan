import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Pages statiques à prerendre
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'artisans',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'mentions-legales',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'donnees-personnelles',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'accessibilite',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'cookies',
    renderMode: RenderMode.Prerender
  },
  // Route dynamique artisan/:id en SSR (pas de prerender)
  {
    path: 'artisan/:id',
    renderMode: RenderMode.Server
  },
  // Toutes les autres routes en SSR
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
