import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    accept: 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private readonly baseUrl: string = 'http://localhost:8080';

  constructor(private readonly http: HttpClient) {}

  getAllWeek(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cour`);
  }

  getWeekByDate(date: string): Observable<any> {
    const urlApi = `${this.baseUrl}/cour/${date}`;
    return this.http.get(`${urlApi}`);
  }
}
