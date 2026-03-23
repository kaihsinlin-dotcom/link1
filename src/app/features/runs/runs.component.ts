import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { assignmentRuns, parameterSets } from '../../data/mock-data';
import { AssignmentRun, RunStatus } from '../../types/assignment';
import {
  NewRunDialogComponent,
  NewRunDialogResult,
} from '../new-run-dialog/new-run-dialog.component';

@Component({
  selector: 'app-runs',
  standalone: false,
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss'],
})
export class RunsComponent implements OnInit {
  runs: AssignmentRun[] = [];
  displayedColumns = [
    'id',
    'description',
    'weekLabel',
    'mode',
    'status',
    'score',
    'by',
    'versions',
    'actions',
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.runs = [...assignmentRuns];
  }

  openNewRunDialog(): void {
    const ref = this.dialog.open(NewRunDialogComponent, {
      data: { parameterSets },
      width: '560px',
    });

    ref.afterClosed().subscribe((result: NewRunDialogResult | undefined) => {
      if (!result) return;
      const newRun: AssignmentRun = {
        id: `RUN-${String(this.runs.length + 1).padStart(3, '0')}`,
        description: result.description,
        weekOfRun: result.weekOfRun,
        weekLabel: `Week ${result.weekOfRun}`,
        started: new Date().toISOString(),
        by: 'Current User',
        score: 0,
        lastImprovement: new Date().toISOString(),
        mode: result.mode,
        status: 'Running',
        versions: [],
        parameterSetId: result.parameterSetId,
        duration: result.duration,
        snapshotEnabled: result.snapshotEnabled,
        snapshotIntervalMinutes: result.snapshotIntervalMinutes,
      };
      this.runs = [newRun, ...this.runs];
    });
  }

  stopRun(run: AssignmentRun): void {
    run.status = 'Stopped';
  }

  getStatusClass(status: RunStatus): string {
    return `status-${status.toLowerCase()}`;
  }

  getScoreColor(score: number): string {
    if (score >= 90) return 'accent';
    if (score >= 75) return 'primary';
    return 'warn';
  }
}
