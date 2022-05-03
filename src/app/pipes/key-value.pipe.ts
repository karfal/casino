import { Pipe, PipeTransform } from "@angular/core";

interface Object {
  key: string;
  value: string
}

@Pipe({
  name: "keyValue"
})
export class KeyValuePipe implements PipeTransform {

  // return an array of mapped key value pairs of object
  transform(obj: Object | null): Object[] {
    let keys = [];

    for (let key in obj) {
      keys.push({key, value: obj[key as keyof typeof obj]});
    }

    return keys;
  }
}
