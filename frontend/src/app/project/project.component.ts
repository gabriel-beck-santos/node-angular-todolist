import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../shared/project.model';
import { TaskService } from '../task/task.service';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  taskForm: FormGroup;
  projectForm: FormGroup;

  isSubmitted = false;

  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.taskFormValues();
    this. projectFormValues();

    this.projectService.getProjects().subscribe((res: any) => {
      this.projects = res;
    });
  }

  taskFormValues() {
    this.taskForm = this.formBuilder.group({
      description: ['', Validators.required],
    });

  }

  projectFormValues() {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  get formControls() {
    return this.taskForm.controls;
  }

  createTask(projectId: string) {
    if (this.taskForm.valid) {
      this.taskService
        .createTask({
          description: this.taskForm.get('description').value,
          projectId: projectId,
        })
        .subscribe((res: any) => {
          this.taskService.newTaskChange.next(res);
          this.taskFormValues();
          this.taskForm.reset(this.taskForm.value);
        });
    }
  }

  createProject() {
    if (this.projectForm.valid) {
      this.projectService
        .createProject(this.projectForm.value)
        .subscribe((res: any) => {
          this.projectService.getProjects().subscribe((res: any) => {
            this.projects = res;
            this. projectFormValues();
            this.projectForm.reset(this.projectForm.value);
          });
        });
    }
  }

  deleteProject(projectId: string){
    this.projectService.deleteProject(projectId).subscribe((res: any) => {
      this.projectService.getProjects().subscribe((res: any) => {
        this.projects = res;
      });
    });
  }
}
