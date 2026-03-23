import { Component, OnInit } from '@angular/core';
import { parameterSets } from '../../data/mock-data';
import { ParameterSet } from '../../types/assignment';

@Component({
  selector: 'app-parameter-sets',
  standalone: false,
  templateUrl: './parameter-sets.component.html',
  styleUrls: ['./parameter-sets.component.scss'],
})
export class ParameterSetsComponent implements OnInit {
  parameterSets: ParameterSet[] = [];
  displayedColumns = ['name', 'description', 'createdBy', 'usageCount', 'parameters', 'actions'];

  ngOnInit(): void {
    this.parameterSets = [...parameterSets];
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority.toLowerCase()}`;
  }
}
