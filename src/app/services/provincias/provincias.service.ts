import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  private API_SERVER: string = "http://localhost:8080/provincia/";

  constructor(private httpClient: HttpClient) { }


  public getAllProvinciasByPais(idPais: string): Observable<any>{
    return this.httpClient.get(this.API_SERVER + idPais);
  }

}
