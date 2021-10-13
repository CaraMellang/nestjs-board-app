import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  //영어랑 숫자만 가능하게 유효성 체크
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password is only accept english and number',
  })
  password: string;
}
