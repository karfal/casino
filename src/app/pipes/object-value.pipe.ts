import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "objectValue"
})
export class ObjectValuePipe implements PipeTransform {

  transform(value: Object): string {
    return Object.values(value).toString();
  }
}
