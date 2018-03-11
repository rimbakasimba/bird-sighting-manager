import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './index';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserService {
    constructor(private http: HttpClient,
        private db: AngularFireAuth) { }

    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    login(emailId: string, password: string) {
        return this.db.auth.signInWithEmailAndPassword(emailId, password);
    }

    createUser(user: User) {
        return this.db.auth.createUserWithEmailAndPassword(user.emailId, user.password);
        // return this.http.post('/api/users', user);
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}
