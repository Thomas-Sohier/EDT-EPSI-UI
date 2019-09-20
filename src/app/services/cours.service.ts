import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { API_URL } from '@environment';

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
  constructor(private readonly http: HttpClient) {}

  getAllWeek(): Observable<any> {
    return this.http.get(`${API_URL}/cour`);
  }

  getWeekByDate(date: string): Observable<any> {
    const urlApi = `${API_URL}/cour/${date}`;
    return this.http.get(`${urlApi}`);
  }
}
