import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
`import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';`

import { Producto } from './producto.model';

@Injectable()
export class ProductoService {
  selectedProducto: Producto;
  productos: Producto[];
  readonly baseURL = 'http://localhost:3000/productos';

  constructor(private http : HttpClient) { }

  postProducto(prod : Producto){
      return this.http.post(this.baseURL, prod);
  }
}
