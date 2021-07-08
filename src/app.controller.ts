import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AppService, URLType } from './app.service';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import url from 'url';

@Controller()
@ApiTags('Index')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * API to validate a given URL
   * @param queryParams url
   * @returns Object
   */
  @Get('validate/:url')
  @ApiOperation({ summary: 'Validate URL' })
  @ApiQuery({ name: 'url' })
  @ApiResponse({ status: 200, description: 'Ok.' })
  async validateUrl(@Query() queryParams: any): Promise<any> {
    console.log(queryParams.url);

    const validationResp = await this.appService.validateURL(
      queryParams.url,
      false,
    );

    if (validationResp.urlType === URLType.INVALID) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'This is not a valid URL. Please enter a valid URL',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return validationResp;
    }
  }
}
