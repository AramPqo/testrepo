import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MedappointTestModule } from '../../../test.module';
import { ServiceItemComponent } from 'app/entities/service-item/service-item.component';
import { ServiceItemService } from 'app/entities/service-item/service-item.service';
import { ServiceItem } from 'app/shared/model/service-item.model';

describe('Component Tests', () => {
  describe('ServiceItem Management Component', () => {
    let comp: ServiceItemComponent;
    let fixture: ComponentFixture<ServiceItemComponent>;
    let service: ServiceItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedappointTestModule],
        declarations: [ServiceItemComponent],
      })
        .overrideTemplate(ServiceItemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceItemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceItemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ServiceItem(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.serviceItems && comp.serviceItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
