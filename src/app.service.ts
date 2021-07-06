import { HttpStatus, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

interface ValidateURL {
  urlType: URLType;
  urlIntegrity: boolean;
  pathName: boolean;
}

@Injectable()
export class AppService {
  /**
   * To check the validity and integrity of the fiven URL.
   * @param url Requested URL
   * @returns Object
   */
  async validateURL(url: string): Promise<ValidateURL> {
    const requestedURL = new URL(url);
    console.log(requestedURL);
    const hostValidated = this.validateHostName(requestedURL.host);
    const integrityValidated =
      hostValidated !== URLType.INVALID
        ? await this.validateUrlIntegrity(requestedURL.toString())
        : false;
    const pathNameValidated =
      hostValidated !== URLType.INVALID
        ? this.validatePathName(requestedURL.pathname, hostValidated)
        : false;

    return {
      urlType: hostValidated,
      urlIntegrity: integrityValidated,
      pathName: pathNameValidated,
    };
  }

  /**
   * To check if the URL belongs to a valid host
   * @param url Hostname
   * @returns URLType
   */
  validateHostName(url: string) {
    const Regex = {
      reddit: new RegExp('^w?w?w?.?reddit.com$'),
    };
    try {
      if (url.match(Regex.reddit)) {
        return URLType.REDDIT;
      } else {
        return URLType.INVALID;
      }
    } catch (error) {
      if (error.code === 'ERR_INVALID_URL') {
        return URLType.INVALID;
      } else {
        throw new Error(error.code);
      }
    }
  }

  validatePathName(pathName: string, type: URLType) {
    console.log(pathName);
    const Regex = {
      [URLType.REDDIT]: new RegExp(
        '^/r/(d([a-zA-Z]+d)+)/comments/([a-zA-Z]+(d[a-zA-Z]+)+)/(d([a-zA-Z]+d)+)/$',
      ),
    };
    console.log(Regex[type]);
    if (pathName.match(Regex[type])) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * To check the Integrity of the requested URL
   * @param url Requested URL
   * @returns boolean
   */
  async validateUrlIntegrity(url: string) {
    const validStatusCodes = [HttpStatus.OK, HttpStatus.CREATED];
    try {
      const urlResponse = await fetch(url);
      if (validStatusCodes.includes(urlResponse.status)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

export enum URLType {
  REDDIT = 'reddit',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  INVALID = 'invalid',
}
