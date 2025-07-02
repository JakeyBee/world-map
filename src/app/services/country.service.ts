import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl = 'https://api.worldbank.org/v2/country';
  constructor(private http: HttpClient) { }


  //G1 Done. Dont touch.
  getCountryDetails(countryCode: string): Observable<any> {
    console.log(`API: ${this.apiUrl}`)
    return this.http.get(`${this.apiUrl}/${countryCode}?format=json`);
  }
}
