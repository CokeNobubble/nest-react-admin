import { Injectable } from '@nestjs/common';
import * as svgCaptcha from "svg-captcha"
import type { Response } from "express"


@Injectable()
export class VerificationCodeService {
  createCode(session, res: Response, width: number, height: number) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: width || 100,
      height: height || 40,
      background: '#cc9996',
    })

    const code = captcha.text.toUpperCase()
    session.code = code
    res.type('image/svg+xml');
    res.send({
      code: 0,
      data: captcha.data,
      msg: "成功"
    })
  }
}