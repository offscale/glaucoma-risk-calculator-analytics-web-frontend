import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphvizComponent } from './graphviz.component';



@NgModule({
  declarations: [GraphvizComponent],
  imports: [
    CommonModule
  ],
  exports: [GraphvizComponent]
})
export class GraphvizModule { }
