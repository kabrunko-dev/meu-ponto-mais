import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'reverse',
  standalone: true
})
export default class ReversePipe implements PipeTransform {
  transform(value: any): any {
    if(Array.isArray(value)) {
      return value.reverse();
    }

    return value;
  }
}
