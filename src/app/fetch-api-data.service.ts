import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://themovieapp-d539f95ea100.herokuapp.com';

@Injectable({
  providedIn: 'root',
})

// Service to handle errors and extract response data
export class ErrorAndResponseService {
  constructor(protected http: HttpClient) {}

  // Method to handle HTTP errors
  protected handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    // Return an observable with an error message
    const err = new Error('Something went wrong, please try again later.');
    throwError(() => err);
  }
  protected extractResponseData(res: any): any {
    return res || {}; // Return the response body or an empty object
  }
}

@Injectable({
  providedIn: 'root',
})

// Making the api call for the user registration endpoint.
export class UserRegistrationService extends ErrorAndResponseService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(http: HttpClient) {
    super(http); // Call the constructor of the ErrorAndResponseService class
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);

    // Make a POST request to the user registration endpoint
    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(catchError(this.handleError), map(this.extractResponseData));
  }
}

@Injectable({
  providedIn: 'root',
})

// Making the api call for the user login endpoint
export class UserLoginService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + '/login', userDetails, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})

// Making the api call for the Get All Movies endpoint
export class AllMoviesService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getAllMovies(): Observable<any> {
    // Check if localStorage is available before accessing it
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');

      return this.http
        .get(apiUrl + '/movies', {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError));
    } else {
      console.error('localStorage is not available in this environment.');
      return throwError(
        () => new Error('localStorage is not available in this environment.')
      );
    }
  }
}


// Making the api call for the Get One Movie endpoint.
export class OneMovieService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

// Making the api call for the Get Director endpoint.
export class DirectorService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + '/movies/director/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})

// Movie by Directors name
export class MoviesByDirectorService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getMoviesByDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + '/movies/director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})

// Making the api call for the Get Genre endpoint.
export class MoviesByGenreService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getMoviesByGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + '/movies/genre/' + genre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
@Injectable({
  providedIn: 'root',
})

// Making the api call for the Get User endpoint.
   
export class UserListService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getUserList(): Observable<any> {
    const token = localStorage.getItem('token');
   
    return this.http
      .get(apiUrl + '/users', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
@Injectable({
  providedIn: 'root',
})

/* // Making the api call for the Get Favourite Movies for a user endpoint
   
  getFavouriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/users/' + username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  } */

// Making the api call for the Add a Movie to Favourite Movies endpoint.
   
export class AddFavoriteMovieService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public addFavoriteMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    const { UserName } = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.http
      .post(apiUrl + '/users/' + UserName + '/movies/' + title, null, {
        headers,
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
@Injectable({
  providedIn: 'root',
})

// Making the api call for Updating User endpoint.
   
export class UpdateInfoUserService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public updateInfoUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const { UserName } = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.http
      .put(apiUrl + '/users/' + UserName, userData, {
        headers,
      })

      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
@Injectable({
  providedIn: 'root',
})

// Making the api call for the Delete User endpoint
   
export class DeleteUserService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const { _id } = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .delete(apiUrl + '/users/' + _id, {
        headers,
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})


// Making the api call for the Delete a Movie to Favourite Movies endpoint
   
export class RemoveFavoriteMovieService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public removeMovieFromFavorites(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    const { UserName } = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .delete(apiUrl + '/users/' + UserName + '/movies/' + title, {
        headers,
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}