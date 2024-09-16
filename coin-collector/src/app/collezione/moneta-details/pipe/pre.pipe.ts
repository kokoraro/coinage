import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pre'
})
export class PrePipe implements PipeTransform {

  transform(value: string, def?: string): string {
    if(value.trim() == '' && def) {
      return def;
    }
    else {
      return value.replace(/\n/g, '<br/>');
    }
  }

}
