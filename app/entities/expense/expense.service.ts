import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExpense } from 'app/shared/model/expense.model';

type EntityResponseType = HttpResponse<IExpense>;
type EntityArrayResponseType = HttpResponse<IExpense[]>;

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  public resourceUrl = SERVER_API_URL + 'api/expenses';

  constructor(protected http: HttpClient) { }

  create(expense: IExpense): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(expense);
    return this.http.post<IExpense>(this.resourceUrl, copy, { observe: 'response' });
  }

  update(expense: IExpense): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(expense);
    return this.http.put<IExpense>(this.resourceUrl, copy, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IExpense>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExpense[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(expense: IExpense): IExpense {
    const copy: IExpense = Object.assign({}, expense, {
      date: expense.date && expense.date.isValid() ? expense.date.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((expense: IExpense) => {
        expense.date = expense.date ? moment(expense.date) : undefined;
      });
    }
    return res;
  }


  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

}

