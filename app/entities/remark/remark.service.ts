import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRemark } from 'app/shared/model/remark.model';

type EntityResponseType = HttpResponse<IRemark>;
type EntityArrayResponseType = HttpResponse<IRemark[]>;

@Injectable({ providedIn: 'root' })
export class RemarkService {
  public resourceUrl = SERVER_API_URL + 'api/remarks';

  constructor(protected http: HttpClient) { }

  create(remark: IRemark): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(remark);
    // const payload = copy; // < remove only this

    // const payload = new FormData();

    // payload.append('attachments', copy.file, copy.file.name);
    // copy.attachments = [{ attachmentType: copy.file.type }, { fileName: copy.file.name }];
    // delete copy.file;

    // payload.append('remark', JSON.stringify(copy));

    // console.clear();
    // console.log(payload);
    // console.log(copy.attachments);
    // debugger;
    return this.http
      .post<IRemark>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(remark: IRemark): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(remark);

    return this.http
      .put<IRemark>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRemark>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRemark[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(remark: IRemark): IRemark {
    const copy: IRemark = Object.assign({}, remark, {
      createdAt: remark.createdAt && (remark.createdAt as moment.Moment).isValid() ? (remark.createdAt as Date).toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((remark: IRemark) => {
        remark.createdAt = remark.createdAt ? moment(remark.createdAt) : undefined;
      });
    }
    return res;
  }
}
