import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServiceItem } from 'app/shared/model/service-item.model';

type EntityResponseType = HttpResponse<IServiceItem>;
type EntityArrayResponseType = HttpResponse<IServiceItem[]>;

@Injectable({ providedIn: 'root' })
export class ServiceItemService {
  public resourceUrl = SERVER_API_URL + 'api/service-items';

  constructor(protected http: HttpClient) {}

  create(serviceItem: IServiceItem): Observable<EntityResponseType> {
    return this.http.post<IServiceItem>(this.resourceUrl, serviceItem, { observe: 'response' });
  }

  update(serviceItem: IServiceItem): Observable<EntityResponseType> {
    return this.http.put<IServiceItem>(this.resourceUrl, serviceItem, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IServiceItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IServiceItem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
