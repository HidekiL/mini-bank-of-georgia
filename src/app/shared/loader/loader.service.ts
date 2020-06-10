import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = false;

  startLoading() {
    this.isLoading = !this.isLoading;
  }

  endLoading() {
    this.isLoading = false;
  }

  useLoader = <T>(obs: Observable<T>): Observable<T> => {
    this.startLoading();
    return obs.pipe(finalize(() => this.endLoading()));
  }
}
