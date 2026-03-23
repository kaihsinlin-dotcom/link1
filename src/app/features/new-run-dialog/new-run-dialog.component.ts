import { Component, Inject, OnInit } from '@angular/core';
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
export class NewRunDialogComponent implements OnInit {
  form: FormGroup;
  weekOptions: { value: number; label: string }[] = [];
  durationOptions = [0.5, 1, 2, 3, 4, 6, 8, 12, 24];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewRunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewRunDialogData
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      weekOfRun: [null, Validators.required],
      mode: ['Continuous', Validators.required],
      parameterSetId: ['', Validators.required],
      duration: [null],
      snapshotEnabled: [false],
      snapshotIntervalMinutes: [null],
    });
  }

  ngOnInit(): void {
    const year = new Date().getFullYear();
    // ISO weeks can be 52 or 53 per year; using 52 as per spec requirement (Week 1-52)
    this.weekOptions = Array.from({ length: 52 }, (_, i) => ({
      value: i + 1,
      label: `Week ${i + 1} (${year})`,
    }));

    this.form.get('mode')?.valueChanges.subscribe(mode => {
      const durationCtrl = this.form.get('duration');
      if (mode === 'Fixed') {
        durationCtrl?.setValidators(Validators.required);
      } else {
        durationCtrl?.clearValidators();
        durationCtrl?.setValue(null);
      }
      durationCtrl?.updateValueAndValidity();
    });

    this.form.get('snapshotEnabled')?.valueChanges.subscribe(enabled => {
      const intervalCtrl = this.form.get('snapshotIntervalMinutes');
      if (enabled) {
        intervalCtrl?.setValidators([Validators.required, Validators.min(1)]);
        intervalCtrl?.setValue(30);
      } else {
        intervalCtrl?.clearValidators();
        intervalCtrl?.setValue(null);
      }
      intervalCtrl?.updateValueAndValidity();
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
    console.log('New run payload:', result);
    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
