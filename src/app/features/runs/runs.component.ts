import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { assignmentRuns, parameterSets } from '../../data/mock-data';
import { AssignmentRun, RunMode } from '../../types/assignment';
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
  allRuns: AssignmentRun[] = [];
  selection = new SelectionModel<AssignmentRun>(true, []);
  expandedRunId: string | null = null;

  modeFilter: 'all' | RunMode = 'all';
  byFilter = 'all';
  weekFilter = 'all';

  displayedColumns = [
    'expand',
    'select',
    'id',
    'description',
    'weekLabel',
    'started',
    'by',
    'score',
    'lastImprovement',
    'mode',
    'snapshot',
    'actions',
  ];

  durationOptions = [0.5, 1, 2, 3, 4, 6, 8, 12, 24];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.allRuns = [...assignmentRuns];
  }

  get filteredRuns(): AssignmentRun[] {
    return this.allRuns.filter(r => {
      if (this.modeFilter !== 'all' && r.mode !== this.modeFilter) return false;
      if (this.byFilter !== 'all' && r.by !== this.byFilter) return false;
      if (this.weekFilter !== 'all' && r.weekLabel !== this.weekFilter) return false;
      return true;
    });
  }

  get uniqueUsers(): string[] {
    return [...new Set(this.allRuns.map(r => r.by))];
  }

  get uniqueWeeks(): string[] {
    return [...new Set(this.allRuns.map(r => r.weekLabel))].sort((a, b) => {
      const na = parseInt(a.replace('Week ', ''), 10);
      const nb = parseInt(b.replace('Week ', ''), 10);
      return nb - na;
    });
  }

  isAllSelected(): boolean {
    const data = this.filteredRuns;
    return data.length > 0 && this.selection.selected.length === data.length;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.filteredRuns.forEach(r => this.selection.select(r));
    }
  }

  toggleExpand(run: AssignmentRun): void {
    this.expandedRunId = this.expandedRunId === run.id ? null : run.id;
  }

  isExpanded(run: AssignmentRun): boolean {
    return this.expandedRunId === run.id;
  }

  get compareDisabled(): boolean {
    return this.selection.selected.length !== 2;
  }

  onCompare(): void {
    console.log('Comparing:', this.selection.selected.map(r => r.id));
  }

  openNewRunDialog(): void {
    const ref = this.dialog.open(NewRunDialogComponent, {
      data: { parameterSets },
      width: '560px',
      disableClose: true,
    });

    ref.afterClosed().subscribe((result: NewRunDialogResult | undefined) => {
      if (!result) return;
      const newRun: AssignmentRun = {
        id: `RUN-${String(this.allRuns.length + 1).padStart(3, '0')}`,
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
      console.log('New run created:', newRun);
      this.allRuns = [newRun, ...this.allRuns];
    });
  }

  onSave(run: AssignmentRun): void {
    console.log('Save run:', run.id);
  }

  onStop(run: AssignmentRun): void {
    console.log('Stop run:', run.id);
    run.status = 'Stopped';
  }

  onDelete(run: AssignmentRun): void {
    console.log('Delete run:', run.id);
    this.allRuns = this.allRuns.filter(r => r.id !== run.id);
    this.selection.deselect(run);
  }

  trackById(_: number, run: AssignmentRun): string {
    return run.id;
  }

  getWeekDotColor(weekLabel: string): string {
    const colors = ['#3f51b5', '#e91e63', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4'];
    const week = parseInt(weekLabel.replace('Week ', ''), 10);
    return colors[week % colors.length];
  }
}
