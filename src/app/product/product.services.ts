import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/Operators'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'api/products/products.json';
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productUrl).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = ''
    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`
    }else{
      errorMessage = `Server returned Code: ${err.status}, error Message is: ${err.message}`
    }
    console.error(errorMessage)
    return throwError(errorMessage)
  }
}
