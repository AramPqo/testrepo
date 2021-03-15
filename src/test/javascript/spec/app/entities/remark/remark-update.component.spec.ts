import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MedappointTestModule } from '../../../test.module';
import { RemarkUpdateComponent } from 'app/entities/remark/remark-update.component';
import { RemarkService } from 'app/entities/remark/remark.service';
import { Remark } from 'app/shared/model/remark.model';

describe('Component Tests', () => {
  describe('Remark Management Update Component', () => {
    let comp: RemarkUpdateComponent;
    let fixture: ComponentFixture<RemarkUpdateComponent>;
    let service: RemarkService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedappointTestModule],
        declarations: [RemarkUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RemarkUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RemarkUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RemarkService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Remark(123);
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
        const entity = new Remark();
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
