import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanList } from './artisan-list';

describe('ArtisanList', () => {
  let component: ArtisanList;
  let fixture: ComponentFixture<ArtisanList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisanList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtisanList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
