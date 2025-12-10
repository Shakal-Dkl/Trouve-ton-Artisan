import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Artisan, ArtisanService } from '../../services/artisan';

@Component({
  selector: 'app-artisan-detail',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './artisan-detail.html',
  styleUrl: './artisan-detail.scss'
})
export class ArtisanDetail implements OnInit {

  // L'artisan à afficher
  artisan: Artisan | null = null;
  
  // État de chargement
  isLoading = true;
  
  // Formulaire de contact
  contactForm: FormGroup;
  
  // État d'envoi du formulaire
  isSubmitting = false;
  isSubmitted = false;
  
  // Tableau pour afficher les étoiles
  stars: boolean[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artisanService: ArtisanService,
    private formBuilder: FormBuilder
  ) {
    // Initialisation du formulaire de contact
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Récupération de l'ID depuis l'URL
    const artisanId = this.route.snapshot.paramMap.get('id');
    
    if (artisanId) {
      this.loadArtisan(artisanId);
    } else {
      // Si pas d'ID, redirection vers la page 404
      this.router.navigate(['/404']);
    }
  }

  /**
   * Charge les données de l'artisan
   * @param id - L'ID de l'artisan
   */
  private loadArtisan(id: string): void {
    this.artisanService.getArtisanById(id).subscribe({
      next: (artisan) => {
        if (artisan) {
          this.artisan = artisan;
          this.calculateStars();
        } else {
          // Artisan non trouvé, redirection vers 404
          this.router.navigate(['/404']);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'artisan:', error);
        this.router.navigate(['/404']);
      }
    });
  }

  /**
   * Calcule quelles étoiles afficher selon la note
   */
  private calculateStars(): void {
    if (!this.artisan) return;
    
    const rating = parseFloat(this.artisan.note);
    this.stars = [];
    
    // Génère un tableau de 5 étoiles (true = remplie, false = vide)
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i <= rating);
    }
  }

  /**
   * Soumet le formulaire de contact
   */
  onSubmitContact(): void {
    if (this.contactForm.valid && this.artisan) {
      this.isSubmitting = true;
      
      const formData = this.contactForm.value;
      
      // Simulation d'envoi d'email (remplacez par votre service d'email)
      this.sendEmail(formData);
    } else {
      // Marque tous les champs comme touchés pour afficher les erreurs
      this.contactForm.markAllAsTouched();
    }
  }

  /**
   * Simule l'envoi d'un email
   * @param formData - Les données du formulaire
   */
  private sendEmail(formData: any): void {
    // Simulation d'un délai d'envoi
    setTimeout(() => {
      // Email envoyé avec succès
      
      this.isSubmitting = false;
      this.isSubmitted = true;
      
      // Réinitialise le formulaire
      this.contactForm.reset();
      
      // Cache le message de succès après 5 secondes
      setTimeout(() => {
        this.isSubmitted = false;
      }, 5000);
    }, 1500);
  }

  /**
   * Vérifie si un champ a une erreur
   * @param fieldName - Le nom du champ
   * @returns true si le champ a une erreur
   */
  hasFieldError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  /**
   * Récupère le message d'erreur pour un champs.
   * @param fieldName - Le nom du champ
   * @returns Le message d'erreur
   */
  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return 'Ce champ est requis';
      }
      if (field.errors['minlength']) {
        return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
      }
    }
    return '';
  }

  /**
   * Soumet le formulaire de contact (utilisé par le template)
   */
  onSubmit(): void {
    this.onSubmitContact();
  }

  /**
   * Fait défiler vers la section de contact
   */
  scrollToContact(): void {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Retourne à la page précédente
   */
  goBack(): void {
    this.router.navigate(['/artisans']);
  }
}
