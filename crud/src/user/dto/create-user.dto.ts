import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsAlphanumeric(null, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  @MinLength(3, { message: 'Username must have 3 character atlease' })
  username: string;

  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide email' })
  email: string;

  @IsString()
  @IsEnum(['f', 'm', 'u'])
  gender: string;
  @IsInt()
  age: number;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain minimum 8 and maximum 20 characters at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;
}
