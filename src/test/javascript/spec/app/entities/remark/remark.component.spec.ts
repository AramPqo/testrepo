import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MedappointTestModule } from '../../../test.module';
import { RemarkComponent } from 'app/entities/remark/remark.component';
import { RemarkService } from 'app/entities/remark/remark.service';
import { Remark } from 'app/shared/model/remark.model';

describe('Component Tests', () => {
  describe('Remark Management Component', () => {
    let comp: RemarkComponent;
    let fixture: ComponentFixture<RemarkComponent>;
    let service: RemarkService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedappointTestModule],
        declarations: [RemarkComponent],
      })
        .overrideTemplate(RemarkComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RemarkComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RemarkService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Remark(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.remarks && comp.remarks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
