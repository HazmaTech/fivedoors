import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Doors} from "../models/doors";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageloaderService {
  name = 'Doors';
  constructor(private storage:AngularFireStorage, private http: HttpClient) { }

  loadImages(url: string){
    return this.http.get(environment.firebase.storageBucket + '/assets/' + url, {responseType: 'blob'});
  }

}
