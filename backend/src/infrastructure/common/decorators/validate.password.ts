import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SignUpDto } from 'src/core/repositories/auth/dto/signup.dto';

@ValidatorConstraint({ name: 'isPasswordMatching', async: false })
export class isPasswordMatchingConstraint
  implements ValidatorConstraintInterface
{
  public validate(passwordRepeat: string, args: ValidationArguments): boolean {
    const object = args.object as SignUpDto;
    return object.password === passwordRepeat;
  }

  public defaultMessae(): string {
    return 'Пароли не совпадают';
  }
}
