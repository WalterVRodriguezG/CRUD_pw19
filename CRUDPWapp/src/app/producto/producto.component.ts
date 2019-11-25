import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductoService } from '../shared/producto.service'

declare var M: any;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [ProductoService]      
})
export class ProductoComponent implements OnInit {

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm (form?: NgForm){
    if(form)
      form.reset();
      this.productoService.selectedProducto = {
        _id:"",
        idproducto:null,
        nombre:"",
        presentacion:"",
        lote:"",
        preciounit:null,
        idclase:null
      }
  }

  onSubmit(form: NgForm){
      this.productoService.postProducto(form.value).subscribe((res) => {
        this.resetForm(form);
        M.toast({html: 'Producto grabado exitosamente.', classes: 'rounded'});
      });
  }

}
