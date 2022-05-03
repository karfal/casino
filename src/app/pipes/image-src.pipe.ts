import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "imageSrc"
})
export class ImageSrcPipe implements PipeTransform {

	transform(value: any): string {
		return value === null ? "assets/images/slots.svg" : value;
	}
}
