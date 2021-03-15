import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MedappointTestModule } from '../../../test.module';
import { InsurerUpdateComponent } from 'app/entities/insurer/insurer-update.component';
import { InsurerService } from 'app/entities/insurer/insurer.service';
import { Insurer } from 'app/shared/model/insurer.model';

describe('Component Tests', () => {
  describe('Insurer Management Update Component', () => {
    let comp: InsurerUpdateComponent;
    let fixture: ComponentFixture<InsurerUpdateComponent>;
    let service: InsurerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedappointTestModule],
        declarations: [InsurerUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(InsurerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InsurerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InsurerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Insurer(123);
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
        const entity = new Insurer();
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
