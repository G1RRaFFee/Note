import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RegisterDto } from 'src/core/repositories/AuthRepository/dto/register.dto';

@ValidatorConstraint({ name: 'isPasswordMatching', async: false })
export class isPasswordMatchingConstraint
  implements ValidatorConstraintInterface
{
  public validate(passwordRepeat: string, args: ValidationArguments): boolean {
    const object = args.object as RegisterDto;
    return object.password === passwordRepeat;
  }

  public defaultMessae(): string {
    return 'Пароли не совпадают';
  }
}
