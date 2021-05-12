import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(array: any[], maxLength: number, ...args: unknown[]): string {

    const diff = array.length - maxLength;
    let joinedString = array.slice(0, maxLength).join(', ');
    if (diff > 0) {
      joinedString += ` and ${diff} others`;
    }
    return joinedString;
  }

}
