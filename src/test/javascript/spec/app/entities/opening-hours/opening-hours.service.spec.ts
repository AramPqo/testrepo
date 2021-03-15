import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OpeningHoursService } from 'app/entities/opening-hours/opening-hours.service';
import { IOpeningHours, OpeningHours } from 'app/shared/model/opening-hours.model';
import { DayOfWeek } from 'app/shared/model/enumerations/day-of-week.model';

describe('Service Tests', () => {
  describe('OpeningHours Service', () => {
    let injector: TestBed;
    let service: OpeningHoursService;
    let httpMock: HttpTestingController;
    let elemDefault: IOpeningHours;
    let expectedResult: IOpeningHours | IOpeningHours[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(OpeningHoursService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new OpeningHours(0, DayOfWeek.MONDAY, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a OpeningHours', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new OpeningHours()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a OpeningHours', () => {
        const returnedFromService = Object.assign(
          {
            dayOfWeek: 'BBBBBB',
            startTime: 'BBBBBB',
            endTime: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of OpeningHours', () => {
        const returnedFromService = Object.assign(
          {
            dayOfWeek: 'BBBBBB',
            startTime: 'BBBBBB',
            endTime: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a OpeningHours', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
