import { IFormSection } from './../lib/components/form-gen/form.example';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { formGroups } from '../lib/components/form-gen/form.example';
import { formGroups2 } from './../lib/components/form-gen/form.example2';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getData(key: number): Observable<IFormSection[]> {
    if(key === 1) {
      return of(formGroups) as Observable<IFormSection[]>;
    } else {
      return of(formGroups2) as Observable<IFormSection[]>;
    }
  }
}
