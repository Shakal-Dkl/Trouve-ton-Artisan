import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanDetail } from './artisan-detail';

describe('ArtisanDetail', () => {
  let component: ArtisanDetail;
  let fixture: ComponentFixture<ArtisanDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisanDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtisanDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
