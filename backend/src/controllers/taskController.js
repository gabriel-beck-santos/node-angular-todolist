import { model } from 'mongoose';

const Task = model('task');

export async function createTask(request, response) {
    const task = await Task.create(request.body);

    return response.json(task);
}

export async function getTasksByProject(request, response) {
    console.log(request.params.id );
    const tasks = await Task.find({ projectId: request.params.id });

    return response.json(tasks);
}

export async function updateTask(request, response) {
    const task = await Task.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
    });
    return response.json(task);
}

export async function deleteTask(request, response) {
    await Task.findByIdAndDelete(request.params.id);

    return response.status(200).send();
}