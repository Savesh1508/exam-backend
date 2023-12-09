import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.REFRESH_TOKEN_KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [JwtModule],
})
export class SharedModule {}
