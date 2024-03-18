export interface EmployeeHierarchy {
  id: number;
  manager_id: number | null;
  name: string;
  manager_name: string | null;
  designation: string;
  salary: number;
  subordinates?: EmployeeHierarchy[];
}