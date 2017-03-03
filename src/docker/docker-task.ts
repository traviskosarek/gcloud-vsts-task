import * as taskLib from 'vsts-task-lib/task';

export class DockerTask {

    private action: string;
    private gcpServiceAccount: string;
    private dockerFilePath: string;
    private googleContainerRegistry: string;
    private gcpProjectId: string;
    private imageName: string;
    private imageTag: string;
    private useLatestTag: boolean;

    public constructor() {
        this.action = taskLib.getInput('gcpDockerActionSelector', true);
        this.gcpServiceAccount = taskLib.getInput('serviceAccountAuthentication', false);
        this.dockerFilePath = taskLib.getInput('dockerFilePath', false);
        this.googleContainerRegistry = taskLib.getInput('gcpContainerRegistry', true);
        this.gcpProjectId = taskLib.getInput('gcpDockerProjectName', true);
        this.imageName = taskLib.getInput('gcpDockerImageName', true);
        this.imageTag = taskLib.getInput('gcpDockerImageTag', true);
        this.useLatestTag = taskLib.getBoolInput('gcpDockerImageLatestTag', true);
    }
    public run() {
        console.log('action: ' + this.action);
        console.log('gcpServiceAccount: ' + this.gcpServiceAccount);
        console.log('dockerFilePath: ' + this.dockerFilePath);
        console.log('googleContainerRegistry: ' + this.googleContainerRegistry);
        console.log('gcpProjectId: ' + this.gcpProjectId);
        console.log('imageName: ' + this.imageName);
        console.log('imageTag: ' + this.imageTag);
        console.log('useLatestTag: ' + this.useLatestTag);

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
