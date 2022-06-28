import { Component, OnInit, VERSION } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PAYER_NAMES, POLICIES } from './existing-data';
import { Policy } from './policy.model';
import { PrimaryPolicyValidator } from './validators/primary-policy.validator';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  updateForm = this.fb.group(
    {
      globalUninsured: [false],
      plans: this.fb.array([]),
    },
    { validator: PrimaryPolicyValidator }
  );
  payerNames: string[] = PAYER_NAMES;
  existingPolicies: Policy[] = POLICIES;
  minDelete = this.existingPolicies.length - 1;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addExistingPoliciesToForm();
    if (this.existingPolicies.length < 1) {
      this.addInsurance();
    }
  }

  get plans(): FormArray {
    return this.updateForm.get('plans') as FormArray;
  }

  addExistingPoliciesToForm(): void {
    for (let policy of this.existingPolicies) {
      this.plans.push(
        this.fb.group({
          isInactive: [policy.isInactive],
          isPrimary: [policy.isPrimary],
          payer: [policy.payer, Validators.required],
          policyId: [policy.policyId, Validators.required],
          groupNo: [policy.groupNo, Validators.required],
          pcn: [policy.pcn, Validators.required],
          bin: [policy.bin, Validators.required],
        })
      );
    }
  }

  addInsurance(): void {
    this.updateForm.get('globalUninsured').setValue(false);
    this.plans.push(
      this.fb.group({
        isInactive: [false],
        isPrimary: [false],
        payer: ['', Validators.required],
        policyId: ['', Validators.required],
        groupNo: ['', Validators.required],
        pcn: ['', Validators.required],
        bin: ['', Validators.required],
      })
    );
  }

  removeInsurance(index: number): void {
    this.plans.removeAt(index);
    this.setGlobalUninsured();
  }

  updatePolicies(): void {
    this.updateForm.markAllAsTouched();
    if (this.updateForm.invalid) {
      return;
    }
    this.existingPolicies = [...this.plans.value];
    console.log({ ...this.existingPolicies });
  }

  setPoliciesAsInactive(): void {
    const allInactive = this.updateForm.get('globalUninsured').value;
    if (allInactive) {
      for (const plan of this.plans.controls) {
        plan.get('isInactive').setValue(true);
      }
    }
  }

  /**
   * Checkbox validation. If any insurance is valid, globalUninsured must be false.
   * As long as `hasInsurance` is false, will check for a `true` in each policy within
   * the FormArray.
   */
  setGlobalUninsured(): void {
    this.updateForm
      .get('globalUninsured')
      .setValue(
        this.plans.controls.every(
          (control) => control.get('isInactive').value === true
        )
      );
  }
}
