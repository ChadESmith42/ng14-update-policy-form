import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const PrimaryPolicyValidator: ValidatorFn = (
  fg: AbstractControl
): ValidationErrors | null => {
  const plans = fg.get('plans').value;
  const primaryPolicyCount = plans.filter(
    (policy) => policy.isPrimary === true
  ).length;
  if (primaryPolicyCount > 1) {
    return { multiplePrimary: true };
  }
  if (primaryPolicyCount === 0) {
    return { primaryRequired: true };
  }
  return null;
};
