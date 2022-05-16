import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const result = [];
    for (const posts of value){
      if(posts.title.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        result.push(posts);
      }
    }
    return result;
  }

}
