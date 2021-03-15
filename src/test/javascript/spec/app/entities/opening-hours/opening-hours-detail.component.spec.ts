import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedappointTestModule } from '../../../test.module';
import { OpeningHoursDetailComponent } from 'app/entities/opening-hours/opening-hours-detail.component';
import { OpeningHours } from 'app/shared/model/opening-hours.model';

describe('Component Tests', () => {
  describe('OpeningHours Management Detail Component', () => {
    let comp: OpeningHoursDetailComponent;
    let fixture: ComponentFixture<OpeningHoursDetailComponent>;
    const route = ({ data: of({ openingHours: new OpeningHours(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedappointTestModule],
        declarations: [OpeningHoursDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OpeningHoursDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OpeningHoursDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load openingHours on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.openingHours).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
