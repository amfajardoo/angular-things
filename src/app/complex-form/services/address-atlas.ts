import { Injectable } from '@angular/core';
import { delay, firstValueFrom, type Observable, of } from 'rxjs';
import { type Address, FAKE_ADDRESSES } from '../form-data';

@Injectable({
  providedIn: 'root',
})
export class AddressAtlas {
  TWO_SECONDS = 20000;

  /**
   * 🔎 Simula la búsqueda de direcciones por un término, devolviendo un Observable.
   * Ideal para ser consumida con el operador | async en plantillas o para encadenar
   * operadores RxJS.
   * @param query El texto de búsqueda.
   * @returns Un Observable<Address[]>.
   */
  public searchAddressesObservable(query: string): Observable<Address[]> {
    const term = query.toLowerCase().trim();

    const results = FAKE_ADDRESSES.filter(
      (address) =>
        address.street.toLowerCase().includes(term) ||
        address.city.toLowerCase().includes(term) ||
        address.state.toLowerCase().includes(term) ||
        address.zipCode.includes(term),
    );

    // Simula el tiempo de respuesta de la red
    return of(results).pipe(delay(this.TWO_SECONDS));
  }

  /**
   * 🏘️ Simula la obtención de todas las direcciones, devolviendo un Observable.
   * @returns Un Observable<Address[]>.
   */
  public getAllAddressesObservable(): Observable<Address[]> {
    return of(FAKE_ADDRESSES).pipe(delay(200));
  }

  /**
   * 🔎 Simula la búsqueda de direcciones por un término, devolviendo una Promise.
   * Ideal para ser consumida con la sintaxis async/await.
   * @param query El texto de búsqueda.
   * @returns Una Promise<Address[]>.
   */
  public searchAddressesPromise(query: string): Promise<Address[]> {
    console.log('AddressAtlas: searchAddressesPromise called with query:', query);
    return firstValueFrom(this.searchAddressesObservable(query));
  }

  /**
   * 🏘️ Simula la obtención de todas las direcciones, devolviendo una Promise.
   * @returns Una Promise<Address[]>.
   */
  public getAllAddressesPromise(): Promise<Address[]> {
    return firstValueFrom(this.getAllAddressesObservable());
  }
}
