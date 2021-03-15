import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedappointTestModule } from '../../../test.module';
import { ServiceItemDetailComponent } from 'app/entities/service-item/service-item-detail.component';
import { ServiceItem } from 'app/shared/model/service-item.model';

describe('Component Tests', () => {
  describe('ServiceItem Management Detail Component', () => {
    let comp: ServiceItemDetailComponent;
    let fixture: ComponentFixture<ServiceItemDetailComponent>;
    const route = ({ data: of({ serviceItem: new ServiceItem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedappointTestModule],
        declarations: [ServiceItemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ServiceItemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServiceItemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load serviceItem on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.serviceItem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
