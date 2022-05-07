import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converter'
})
export class ConverterPipe implements PipeTransform {
  transform(value: string): string { //expand this later lmao
    return atob(value).split(' ')[0];
  }

}
