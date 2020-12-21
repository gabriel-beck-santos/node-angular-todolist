import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../shared/task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasksUndone: Task[] = [];
  tasksDone: Task[] = [];
  taskForm: FormGroup;

  @Input() projectId: string;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      description: ['', Validators.required],
    });

    this.taskService.getTasks(this.projectId).subscribe((taskList) => {
      this.tasksDone = taskList.filter((task) => task.checked);
      this.tasksUndone = taskList.filter((task) => !task.checked);
    });

    this.taskService.newTaskChange.subscribe((newTask: Task) => {
      this.taskService.getTasks(this.projectId).subscribe((taskList) => {
        this.tasksDone = taskList.filter((task) => task.checked);
        this.tasksUndone = taskList.filter((task) => !task.checked);
      });
    });
  }

  taskDone(task: Task){
    task.checked = true;

    this.taskService.updateTask(task).subscribe((res: any) => {
      this.taskService.getTasks(this.projectId).subscribe((taskList) => {
        this.tasksDone = taskList.filter((task) => task.checked);
        this.tasksUndone = taskList.filter((task) => !task.checked);
      });
    });
  }

  updateTask(task: Task) {
    if (this.taskForm.valid) {
      task.description = this.taskForm.get('description').value;
      task.checked = this.taskForm.get('checked').value;
      task.checkedDate = new Date();

      this.taskService.updateTask(task).subscribe((res: any) => {
        this.taskService.getTasks(this.projectId).subscribe((taskList) => {
          this.tasksDone = taskList.filter((task) => task.checked);
          this.tasksUndone = taskList.filter((task) => !task.checked);
        });
      });
    }
  }

  deleteTask(taskId: string){
    this.taskService.deleteTask(taskId).subscribe((res: any) => {
      this.taskService.getTasks(this.projectId).subscribe((taskList) => {
        this.tasksDone = taskList.filter((task) => task.checked);
        this.tasksUndone = taskList.filter((task) => !task.checked);
      });
    });
  }
}
