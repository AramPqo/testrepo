import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MedappointTestModule } from '../../../test.module';
import { InsurerComponent } from 'app/entities/insurer/insurer.component';
import { InsurerService } from 'app/entities/insurer/insurer.service';
import { Insurer } from 'app/shared/model/insurer.model';

describe('Component Tests', () => {
  describe('Insurer Management Component', () => {
    let comp: InsurerComponent;
    let fixture: ComponentFixture<InsurerComponent>;
    let service: InsurerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedappointTestModule],
        declarations: [InsurerComponent],
      })
        .overrideTemplate(InsurerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InsurerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InsurerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Insurer(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.insurers && comp.insurers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
