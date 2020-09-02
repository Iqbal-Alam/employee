import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'candidateNameFilter'
})
export class CandidateNameFilterPipe implements PipeTransform {

  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
      return items;
    }
    return filter
      ? items.filter(item => item.name.toLowerCase().indexOf(filter) !== -1)
      : items;

  }

}
