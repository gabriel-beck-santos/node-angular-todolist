  
import { model } from 'mongoose';
const Project = model('project');
const Task = model('task');

export async function getProjects(request, response) {
    const projects = await Project.find({ userId: request.auth.id });

    return response.json(projects);
}

export async function createProject(request, response) {
    const project = await Project.create({userId: request.auth.id, name:  request.body.name});

    return response.json(project);
}

export async function updateProject(request, response) {
    const project = await Project.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
            new: true,
        }
    );
    
    return response.json(project);
}

export async function deleteProject(request, response) {
    await Project.findByIdAndDelete(request.params.id);

    return response.status(200).send();
}