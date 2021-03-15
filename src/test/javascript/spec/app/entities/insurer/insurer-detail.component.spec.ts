import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedappointTestModule } from '../../../test.module';
import { InsurerDetailComponent } from 'app/entities/insurer/insurer-detail.component';
import { Insurer } from 'app/shared/model/insurer.model';

describe('Component Tests', () => {
  describe('Insurer Management Detail Component', () => {
    let comp: InsurerDetailComponent;
    let fixture: ComponentFixture<InsurerDetailComponent>;
    const route = ({ data: of({ insurer: new Insurer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedappointTestModule],
        declarations: [InsurerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(InsurerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InsurerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load insurer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.insurer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
