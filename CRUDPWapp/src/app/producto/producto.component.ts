import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductoService } from '../shared/producto.service'
import { Producto } from '../shared/producto.model';



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
    this.refreshProductoList();
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
    if(form.value._id == ""){ 
      this.productoService.postProducto(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshProductoList();
        M.toast({html: 'Producto grabado exitosamente.', classes: 'rounded'});
      });
  }
  else{
    this.productoService.putProducto(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshProductoList();
      M.toast({html: 'Producto actualizado exitosamente.', classes: 'rounded'});
    });
  }
}

  refreshProductoList(){
    this.productoService.getProductoList().subscribe((res) => {
      this.productoService.productos = res as Producto[];
    });
    
  }

  onEdit(prod : Producto){
    this.productoService.selectedProducto = prod;
  }

  onDelete(_id: string, form: NgForm){
    if(confirm('¿Deseas eliminar el producto?') == true){
      this.productoService.deleteProducto(_id).subscribe((res) => {
        this.refreshProductoList();
        this.resetForm(form);
        M.toast({html: 'Producto eliminado exitosamente.',classes:'rounded'});
      });
    }
  }

}
