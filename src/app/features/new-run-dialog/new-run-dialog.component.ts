import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParameterSet, RunMode } from '../../types/assignment';

export interface NewRunDialogData {
  parameterSets: ParameterSet[];
}

export interface NewRunDialogResult {
  description: string;
  weekOfRun: number;
  mode: RunMode;
  parameterSetId: string;
  duration?: number;
  snapshotEnabled: boolean;
  snapshotIntervalMinutes?: number;
}

@Component({
  selector: 'app-new-run-dialog',
  standalone: false,
  templateUrl: './new-run-dialog.component.html',
  styleUrls: ['./new-run-dialog.component.scss'],
})
export class NewRunDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewRunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewRunDialogData
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      weekOfRun: [1, [Validators.required, Validators.min(1), Validators.max(52)]],
      mode: ['Continuous', Validators.required],
      parameterSetId: ['', Validators.required],
      duration: [2],
      snapshotEnabled: [false],
      snapshotIntervalMinutes: [30],
    });
  }

  get isFixed(): boolean {
    return this.form.get('mode')?.value === 'Fixed';
  }

  get snapshotEnabled(): boolean {
    return this.form.get('snapshotEnabled')?.value === true;
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const value = this.form.value;
    const result: NewRunDialogResult = {
      description: value.description,
      weekOfRun: value.weekOfRun,
      mode: value.mode,
      parameterSetId: value.parameterSetId,
      snapshotEnabled: value.snapshotEnabled,
    };
    if (this.isFixed) {
      result.duration = value.duration;
    }
    if (value.snapshotEnabled) {
      result.snapshotIntervalMinutes = value.snapshotIntervalMinutes;
    }
    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
