export type RunMode = 'Fixed' | 'Continuous';
export type RunStatus = 'Running' | 'Completed' | 'Failed' | 'Stopped';

export interface Technician {
  id: string;
  name: string;
  skills: string[];
  maxSessionsPerWeek: number;
}

export interface MeetingSession {
  id: string;
  title: string;
  weekOfYear: number;
  year: number;
  requiredSkills: string[];
  durationHours: number;
}

export interface AssignmentScenario {
  id: string;
  name: string;
  description: string;
  technicians: Technician[];
  sessions: MeetingSession[];
}

export interface RunVersion {
  version: number;
  score: number;
  createdAt: string;
}

export interface AssignmentRun {
  id: string;
  description: string;
  weekOfRun: number;
  weekLabel: string;
  started: string;
  by: string;
  score: number;
  lastImprovement: string;
  mode: RunMode;
  status: RunStatus;
  versions: RunVersion[];
  parameterSetId: string;
  duration?: number;
  snapshotEnabled: boolean;
  snapshotIntervalMinutes?: number;
}

export interface ParameterSet {
  id: string;
  name: string;
  description: string;
  created: string;
  createdBy: string;
  usageCount: number;
  parameters: {
    maxSessionsPerTech: number;
    skillsPriority: 'High' | 'Medium' | 'Low';
    overtimeOk: boolean;
    penaltyWeight: number;
  };
}
