import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MedappointTestModule } from '../../../test.module';
import { OpeningHoursComponent } from 'app/entities/opening-hours/opening-hours.component';
import { OpeningHoursService } from 'app/entities/opening-hours/opening-hours.service';
import { OpeningHours } from 'app/shared/model/opening-hours.model';

describe('Component Tests', () => {
  describe('OpeningHours Management Component', () => {
    let comp: OpeningHoursComponent;
    let fixture: ComponentFixture<OpeningHoursComponent>;
    let service: OpeningHoursService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedappointTestModule],
        declarations: [OpeningHoursComponent],
      })
        .overrideTemplate(OpeningHoursComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OpeningHoursComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OpeningHoursService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OpeningHours(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.openingHours && comp.openingHours[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
