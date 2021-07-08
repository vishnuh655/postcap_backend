import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, URLType, ValidateURL } from './app.service';

describe('appController', () => {
  let appService: AppService;
  let appController: AppController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  describe('validateURL', () => {
    describe('when validateUrl is called', () => {
      test('then it  call appService', async () => {
        const result = {
          urlType: URLType.FACEBOOK,
          urlIntegrity: true,
          pathName: true,
        };
        jest.spyOn(appService, 'validateURL').mockResolvedValue(result);
        expect(
          await appController.validateUrl(
            'https://www.reddit.com/r/Kerala/comments/og5ae8/17_year_old_kerala_boy_nihal_sarin_crosses_elo/',
          ),
        ).toBe(result);
      });
    });
  });
});
