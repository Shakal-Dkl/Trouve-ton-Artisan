# 🔨 Trouve ton Artisan

**Plateforme de recherche d'artisans en Auvergne-Rhône-Alpes**

Application web développée pour la région Auvergne-Rhône-Alpes permettant aux particuliers de trouver facilement un artisan qualifié et de le contacter via un formulaire dédié.

## 📋 Prérequis

Avant d'installer et lancer le projet, assurez-vous d'avoir :

- **Node.js** version 18.x ou supérieure
- **npm** version 9.x ou supérieure  
- **Angular CLI** version 20.x ou supérieure
- Un éditeur de code (recommandé : **Visual Studio Code**)

### Vérifier les versions installées

```bash
node --version
npm --version
ng version
```

## 🚀 Installation

1. **Cloner le repository**
```bash
git clone https://github.com/Shakal-Dkl/Trouve-ton-Artisan.git
cd Trouve-ton-Artisan
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Vérifier l'installation**
```bash
npm list
```

## 💻 Lancement du projet

### Serveur de développement

Pour démarrer le serveur de développement :

```bash
ng serve
```

L'application sera accessible sur `http://localhost:4200/`. La page se rechargera automatiquement lors des modifications du code.

### Serveur avec port personnalisé

```bash
ng serve --port 4201
```

### Mode production

Pour construire le projet en mode production :

```bash
ng build --configuration production
```

Les fichiers de build seront générés dans le dossier `dist/`.

## 🧪 Tests

### Tests unitaires

```bash
ng test
```

### Lancement en mode watch

```bash
ng test --watch=true
```

## 📁 Structure du projet

```
src/
├── app/
│   ├── components/          # Composants réutilisables
│   │   ├── header/         
│   │   ├── footer/         
│   │   ├── search-bar/     
│   │   └── artisan-card/   
│   ├── pages/              # Pages de l'application
│   │   ├── home/           
│   │   ├── artisan-list/   
│   │   ├── artisan-detail/ 
│   │   ├── not-found/      
│   │   └── legal/          # Pages légales
│   └── services/           # Services Angular
│       ├── artisan.ts      # Service de gestion des artisans
│       ├── email.ts        # Service d'envoi d'emails
│       └── search.ts       # Service de recherche
├── assets/                 # Ressources statiques
└── public/                 # Fichiers publics (datas.json)
```

## 🎨 Technologies utilisées

- **Framework** : Angular 20.2 avec SSR
- **UI Framework** : Bootstrap 5.3
- **Styling** : SCSS avec variables personnalisées
- **HTTP Client** : Angular HttpClient pour AJAX
- **Icons** : Font Awesome 6.4
- **Fonts** : Police Graphik (région Auvergne-Rhône-Alpes)

## 🌈 Fonctionnalités

- ✅ **Recherche d'artisans** par nom, spécialité et ville
- ✅ **Filtrage par catégories** (Bâtiment, Services, Fabrication, Alimentation)
- ✅ **Fiches détaillées** avec informations complètes des artisans
- ✅ **Formulaire de contact** pour chaque artisan
- ✅ **Design responsive** adapté mobile, tablette et desktop
- ✅ **Artisans du mois** mis en vedette
- ✅ **Navigation intuitive** avec header et footer
- ✅ **Pages légales** conformes aux exigences

## 🔒 Sécurité

Les mesures de sécurité mises en place incluent :

- **Validation côté client** : Validation des formulaires avec Angular Reactive Forms
- **Sanitisation** : Protection contre les injections XSS via Angular DomSanitizer
- **HTTPS** : Configuration pour forcer HTTPS en production
- **Headers sécurisés** : Content Security Policy et autres headers de sécurité
- **Validation des données** : Contrôles stricts sur les entrées utilisateur
- **Serveur de mail local** : Utilisation de maildev pour éviter les spams en développement

## 🎯 Charte graphique

**Palette de couleurs :**
- Bleu principal : `#0074c7`
- Bleu clair : `#f1f8fc` 
- Bleu foncé : `#00497c`
- Gris neutre : `#384050`
- Rouge accent : `#cd2c2e`
- Vert accent : `#82b864`

## 📧 Contact

**Région Auvergne-Rhône-Alpes**  
101 cours Charlemagne  
CS 20033  
69269 LYON CEDEX 02  
France  

📞 +33 (0)4 26 73 40 00

## 📄 Licence

Projet développé pour la région Auvergne-Rhône-Alpes - Tous droits réservés.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
