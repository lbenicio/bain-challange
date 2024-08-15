import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) {
    this.logger = new Logger(AppService.name);
  }

  getHello(): string {
    this.logger.debug(`getHelo()`);
    return 'Nothing to see here. Move along.';
  }
}
