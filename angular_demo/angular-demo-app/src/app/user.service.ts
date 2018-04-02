import { Injectable } from '@angular/core';
import { IUser } from './user/user';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    constructor(private _http: Http) {

    }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'Basic ' +
            btoa('admin:rajan'));
    }

    getUsers(): Observable<IUser[]> {
      const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Basic YWRtaW46cmFqYW4=');

        const options = new RequestOptions({ headers: myHeaders });

        return this._http.get('http://localhost:8080/user', options)
            .map((response: Response) => <IUser[]>response.json())
            .catch(this.handleError);
    }


    getUserById(id: string): Promise<IUser> {
      const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Basic YWRtaW46cmFqYW4=');
        const options = new RequestOptions({ headers: myHeaders });

        return this._http.get('http://localhost:8080/user/' + id, options).map((response: Response) => <IUser>response.json()).toPromise();
    }

    addUser(user: IUser): Observable<IUser> {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: myHeaders });
        return this._http.post('http://localhost:8080/user', user).map((response: Response) => <IUser>response.json())
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}
