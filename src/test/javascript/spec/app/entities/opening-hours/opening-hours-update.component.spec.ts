import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MedappointTestModule } from '../../../test.module';
import { OpeningHoursUpdateComponent } from 'app/entities/opening-hours/opening-hours-update.component';
import { OpeningHoursService } from 'app/entities/opening-hours/opening-hours.service';
import { OpeningHours } from 'app/shared/model/opening-hours.model';

describe('Component Tests', () => {
  describe('OpeningHours Management Update Component', () => {
    let comp: OpeningHoursUpdateComponent;
    let fixture: ComponentFixture<OpeningHoursUpdateComponent>;
    let service: OpeningHoursService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedappointTestModule],
        declarations: [OpeningHoursUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(OpeningHoursUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OpeningHoursUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OpeningHoursService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OpeningHours(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new OpeningHours();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
