import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInsurer } from 'app/shared/model/insurer.model';

type EntityResponseType = HttpResponse<IInsurer>;
type EntityArrayResponseType = HttpResponse<IInsurer[]>;

@Injectable({ providedIn: 'root' })
export class InsurerService {
  public resourceUrl = SERVER_API_URL + 'api/insurers';

  constructor(protected http: HttpClient) {}

  create(insurer: IInsurer): Observable<EntityResponseType> {
    return this.http.post<IInsurer>(this.resourceUrl, insurer, { observe: 'response' });
  }

  update(insurer: IInsurer): Observable<EntityResponseType> {
    return this.http.put<IInsurer>(this.resourceUrl, insurer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInsurer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInsurer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
