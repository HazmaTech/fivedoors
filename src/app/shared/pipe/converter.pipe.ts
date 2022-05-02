import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converter'
})
export class ConverterPipe implements PipeTransform {
  transform(value: string): string { //expand this later lmao
    return btoa(value);
  }
  transformTo(value: string):string{
    return atob(value);
  }
}
