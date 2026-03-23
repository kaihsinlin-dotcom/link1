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
  displayedColumns = ['id', 'name', 'description', 'created', 'createdBy', 'usageCount', 'parameters', 'actions'];

  ngOnInit(): void {
    this.parameterSets = [...parameterSets];
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority.toLowerCase()}`;
  }

  onEdit(ps: ParameterSet): void {
    console.log('Edit parameter set:', ps.id);
  }

  onDelete(ps: ParameterSet): void {
    console.log('Delete parameter set:', ps.id);
    this.parameterSets = this.parameterSets.filter(p => p.id !== ps.id);
  }

  onDuplicate(ps: ParameterSet): void {
    console.log('Duplicate parameter set:', ps.id);
    const copy: ParameterSet = {
      ...ps,
      id: `${ps.id}-copy`,
      name: `${ps.name} (copy)`,
      created: new Date().toISOString(),
      usageCount: 0,
    };
    this.parameterSets = [...this.parameterSets, copy];
  }
}
