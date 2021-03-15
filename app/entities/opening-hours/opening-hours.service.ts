import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOpeningHours } from 'app/shared/model/opening-hours.model';

type EntityResponseType = HttpResponse<IOpeningHours>;
type EntityArrayResponseType = HttpResponse<IOpeningHours[]>;

@Injectable({ providedIn: 'root' })
export class OpeningHoursService {
  public resourceUrl = SERVER_API_URL + 'api/opening-hours';

  constructor(protected http: HttpClient) {}

  create(openingHours: IOpeningHours): Observable<EntityResponseType> {
    return this.http.post<IOpeningHours>(this.resourceUrl, openingHours, { observe: 'response' });
  }

  update(openingHours: IOpeningHours): Observable<EntityResponseType> {
    return this.http.put<IOpeningHours>(this.resourceUrl, openingHours, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOpeningHours>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOpeningHours[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
