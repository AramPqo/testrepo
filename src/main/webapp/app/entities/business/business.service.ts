import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBusiness } from 'app/shared/model/business.model';

type EntityResponseType = HttpResponse<IBusiness>;
type EntityArrayResponseType = HttpResponse<IBusiness[]>;

@Injectable({ providedIn: 'root' })
export class BusinessService {
  public resourceUrl = SERVER_API_URL + 'api/businesses';

  constructor(protected http: HttpClient) {}

  create(business: IBusiness): Observable<EntityResponseType> {
    return this.http.post<IBusiness>(this.resourceUrl, business, { observe: 'response' });
  }

  update(business: IBusiness): Observable<EntityResponseType> {
    return this.http.put<IBusiness>(this.resourceUrl, business, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBusiness>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBusiness[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
