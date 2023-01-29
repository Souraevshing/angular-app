import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Listing } from './types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

//sending auth-token from firebase along with user details
const httpOptionsWithAuthToken = (token: any) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    AuthToken: token,
  }),
});

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  constructor(private http: HttpClient, private auth: AngularFireAuth) {}

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/v1/listings');
  }

  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/v1/listings/${id}`);
  }

  addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/v1/listings/${id}/add-view`,
      {},
      httpOptions
    );
  }

  getListingsForUser(): Observable<Listing[]> {
    return new Observable<Listing[]>((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            if (user && token) {
              this.http
                .get<Listing[]>(
                  `/api/v1/listings/users/${user.uid}/listings`,
                  httpOptionsWithAuthToken(token)
                )
                .subscribe((listings) => {
                  observer.next(listings);
                });
            } else {
              observer.next([]);
            }
          });
      });
    });
  }

  deleteListing(id: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            return this.http
              .delete(
                `/api/v1/listings/delete/${id}`,
                httpOptionsWithAuthToken(token)
              )
              .subscribe(() => observer.next());
          });
      });
    });
  }

  createListing(
    name: string,
    description: string,
    price: number
  ): Observable<Listing> {
    return new Observable<Listing>((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            this.http
              .post<Listing>(
                '/api/v1/listings/create',
                {
                  name,
                  description,
                  price,
                },
                httpOptionsWithAuthToken(token)
              )
              .subscribe(() => observer.next());
          });
      });
    });
  }

  updateListing(
    id: string,
    name: string,
    description: string,
    price: number
  ): Observable<Listing> {
    return new Observable<Listing>((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            return this.http
              .post<Listing>(
                `/api/v1/listings/update/${id}`,
                { name, description, price },
                httpOptionsWithAuthToken(token)
              )
              .subscribe(() => observer.next());
          });
      });
    });
  }
}
