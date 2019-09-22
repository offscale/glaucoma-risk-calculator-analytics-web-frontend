import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SvgViewerComponent } from './svg-viewer.component';


@NgModule({
  imports: [HttpClientModule],
  exports: [SvgViewerComponent],
  declarations: [SvgViewerComponent],
})
export class SvgViewerModule {}
