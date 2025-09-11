export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';
export type Status = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export interface Defect {
  id: number | string;
  title: string;
  severity: Severity;
  status: Status;
  reportedBy?: string;
  description?: string;
  partNumber?: string;
  supplier?: string;
  createdAt: string;  // ISO
  updatedAt?: string; // ISO
  assignedTo?: string;
  tags?: string[];
  stepsToReproduce?: string[];
  attachments?: string[];
  priorityRank?: number;
}
