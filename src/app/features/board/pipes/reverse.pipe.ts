import { Pipe, PipeTransform } from '@angular/core';

import { TimeCard } from '@shared/interfaces';

@Pipe({
  name: 'reverse',
  standalone: true,
})
export default class ReversePipe implements PipeTransform {
  transform(value: TimeCard[]): TimeCard[] {
    return value.reverse();
  }
}
