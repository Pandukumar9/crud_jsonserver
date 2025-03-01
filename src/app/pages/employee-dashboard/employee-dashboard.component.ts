import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-employee-dashboard',
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})
export class EmployeeDashboardComponent {
  employeeForm!: FormGroup;
  employees: any[] = [];
  isEdit = false;
  selectedEmployeeId!: number;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEmployees();
  }

  initForm() {
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      mobilenumber: ['', [Validators.required]],
      gmail: ['', [Validators.required, Validators.email]],
      adharnumber: ['', Validators.required],
      collegename: ['', Validators.required],
      branch: ['', Validators.required],
      passedoutyear: ['', [Validators.required]],
      hallticketnumber: ['', Validators.required]
    });
  }

  loadEmployees() {
    this.api.getEmployees().subscribe((data:any) => this.employees = data);
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }
    if (this.isEdit) {
      this.api.updateEmployee(this.selectedEmployeeId, this.employeeForm.value).subscribe(() => {
        this.loadEmployees();
        this.resetForm();
      });
    } else {

      this.api.addEmployee(this.employeeForm.value).subscribe((res:any) => {
        console.log(res);
        this.loadEmployees();
        this.resetForm();
      });
    }
  }

  editEmployee(employee: any) {
    this.employeeForm.patchValue(employee);
    this.isEdit = true;
    this.selectedEmployeeId = employee.id;
  }

  deleteEmployee(id: number) {
    this.api.deleteEmployee(id).subscribe(() => this.loadEmployees());
  }

  resetForm() {
    this.employeeForm.reset();
    this.isEdit = false;
  }

  branchOptions: string[] = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical'];
}
