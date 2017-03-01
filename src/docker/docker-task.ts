import * as taskLib from 'vsts-task-lib/task';

export class DockerTask {

    private action: string;

    public constructor() {
        this.action = taskLib.getInput('gcpDockerActionSelector');
    }
    public run() {
        console.log(this.action);

        console.log('***************** success *****************');

        taskLib.setResult(taskLib.TaskResult.Succeeded, 'Success Message!');
    }

    private createAuthenticationFile() {
        // todo
    }

    private deleteAuthenticationFile() {
        // todo
    }    
}

let dockerTask = new DockerTask();
dockerTask.run();
