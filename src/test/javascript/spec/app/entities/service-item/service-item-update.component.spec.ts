import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MedappointTestModule } from '../../../test.module';
import { ServiceItemUpdateComponent } from 'app/entities/service-item/service-item-update.component';
import { ServiceItemService } from 'app/entities/service-item/service-item.service';
import { ServiceItem } from 'app/shared/model/service-item.model';

describe('Component Tests', () => {
  describe('ServiceItem Management Update Component', () => {
    let comp: ServiceItemUpdateComponent;
    let fixture: ComponentFixture<ServiceItemUpdateComponent>;
    let service: ServiceItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedappointTestModule],
        declarations: [ServiceItemUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ServiceItemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceItemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceItemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceItem(123);
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
        const entity = new ServiceItem();
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
