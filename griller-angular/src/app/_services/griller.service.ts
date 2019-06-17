import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from '../config';

@Injectable({ providedIn: 'root' })
export class GrillerService {
    constructor(private http: HttpClient) { }
    create(griller) {
        console.log(griller)
        return this.http.post(`${AppSettings.apiUrl}/Grills`, griller);
    }
}