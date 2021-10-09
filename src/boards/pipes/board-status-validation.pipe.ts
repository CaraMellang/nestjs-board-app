import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { resourceLimits } from 'worker_threads';
import { BoardStatus } from '../boards.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      console.log(this.isStatusValid(`isStatusValid : ${value}`));
      throw new BadRequestException(`${value} isn't in the status options`);  
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    //indexOf는 없는 값이면 -1을 반환
    return index !== -1;
  }
}

