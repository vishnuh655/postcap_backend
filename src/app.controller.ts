import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Index')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get Hello' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getHello(): string {
    return this.appService.getHello();
  }
}
