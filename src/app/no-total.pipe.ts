import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noTotal', pure: true
})
export class NoTotalPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value.length && value[value.length - 1].hasOwnProperty('key'))
      return (value as Array<{key: string, value: any}>).filter(e => e.key !== 'Total');
    return value;
  }
}
