import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {City} from '../../model/city';
import {Observable} from 'rxjs';
import {Country} from '../../model/country';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) {
  }

  getAllCity(): Observable<City[]> {
    return this.http.get<City[]>(`${API_URL}/cities`);
  }

  createNewCity(city: any): Observable<any> {
    city.country = {
      id: city.country
    };
    return this.http.post<City>(`${API_URL}/cities`, city);
  }

  getCityById(id: number): Observable<City> {
    return this.http.get<City>(`${API_URL}/cities/${id}`);
  }

  editCityById(id: number, city: City): Observable<City> {
    city.country = {
      id: city.country
    };
    return this.http.put<City>(`${API_URL}/cities/${id}`, city);
  }

  deleteCityById(id: number): Observable<City> {
    return this.http.delete<City>(`${API_URL}/cities/${id}`);
  }
}
