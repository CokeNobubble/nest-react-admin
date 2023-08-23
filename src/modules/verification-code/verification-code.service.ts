import { Injectable } from '@nestjs/common';
import * as svgCaptcha from "svg-captcha"

@Injectable()
export class VerificationCodeService {
  createCode(session, width: number, height: number) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: width || 100,
      height: height || 40,
      background: '#cc9996',
    })
    const code = captcha.text.toUpperCase()
    session.code = code
    return captcha.data
  }
}