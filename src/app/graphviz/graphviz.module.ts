import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphvizComponent } from './graphviz.component';
import { SvgViewerModule } from '../svg-viewer/svg-viewer.module';


@NgModule({
  declarations: [GraphvizComponent],
  imports: [
    CommonModule,
    SvgViewerModule
  ],
  exports: [GraphvizComponent]
})
export class GraphvizModule { }
