import { HttpStatus, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

interface ValidateURL {
  urlType: URLType;
  urlIntegrity: boolean;
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

    const hostValidated = this.validateHostName(requestedURL.host);
    const integrityValidated =
      hostValidated !== URLType.INVALID
        ? await this.validateUrlIntegrity(requestedURL.toString())
        : false;

    return {
      urlType: hostValidated,
      urlIntegrity: integrityValidated,
    };
  }

  /**
   * To check if the URL belongs to a valid host
   * @param url Hostname
   * @returns URLType
   */
  validateHostName(url: string) {
    const Regex = {
      Reddit: /reddit\.com/i,
    };
    try {
      if (Regex.Reddit.test(url)) {
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
