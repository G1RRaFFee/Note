import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class isPasswordMatchingConstraint implements ValidatorConstraintInterface {
    validate(passwordRepeat: string, args: ValidationArguments): boolean;
    defaultMessae(): string;
}
