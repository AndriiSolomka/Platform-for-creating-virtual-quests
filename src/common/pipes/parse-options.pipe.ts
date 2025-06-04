import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseOptionsPipe implements PipeTransform {
  transform(value: { options?: string | object }) {
    if (typeof value.options === 'string') {
      try {
        const parsedOptions = JSON.parse(value.options) as Record<
          string,
          unknown
        >;
        value.options = parsedOptions;
      } catch {
        throw new BadRequestException('Invalid options format');
      }
    }
    return value;
  }
}
