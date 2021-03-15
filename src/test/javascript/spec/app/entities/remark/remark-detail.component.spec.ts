import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedappointTestModule } from '../../../test.module';
import { RemarkDetailComponent } from 'app/entities/remark/remark-detail.component';
import { Remark } from 'app/shared/model/remark.model';

describe('Component Tests', () => {
  describe('Remark Management Detail Component', () => {
    let comp: RemarkDetailComponent;
    let fixture: ComponentFixture<RemarkDetailComponent>;
    const route = ({ data: of({ remark: new Remark(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedappointTestModule],
        declarations: [RemarkDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RemarkDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RemarkDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load remark on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.remark).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
