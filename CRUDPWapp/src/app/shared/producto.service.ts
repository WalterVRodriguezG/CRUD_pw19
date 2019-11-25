import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Producto } from './producto.model';
`import { privateDecrypt } from 'crypto';`

@Injectable()
export class ProductoService {
  selectedProducto: Producto;
  productos: Producto[];
  readonly baseURL = 'http://localhost:3000/productos';

  constructor(private http : HttpClient) { }

  postProducto(prod : Producto){
      return this.http.post(this.baseURL, prod);
  }

  getProductoList(){
    return this.http.get(this.baseURL);
  }
  
  putProducto(prod : Producto){
    return this.http.put(this.baseURL + `/${prod._id}`, prod);
  }

  deleteProducto(_id: string){
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
