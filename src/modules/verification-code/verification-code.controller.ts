import { Controller, Get, ParseIntPipe, Query, Req, Res, Session } from '@nestjs/common';
import { VerificationCodeService } from './verification-code.service';
import { Public } from 'src/common/decorator/public.decorator';
import { Request, Response } from "express"

@Controller('auth')
export class VerificationCodeController {
  constructor(private readonly verificationCodeService: VerificationCodeService) { }


  @Public()
  @Get("/captcha")
  createCode(
    @Session() session,
    @Res() res: Response,
    @Query("width", ParseIntPipe) width: number,
    @Query("height", ParseIntPipe) height: number) {
    const data = this.verificationCodeService.createCode(session, width, height);
    res.type('image/svg+xml');
    res.send({
      code: 0,
      data,
      msg: "成功"
    })
  }
}
