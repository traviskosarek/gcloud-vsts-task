import * as taskLib from 'vsts-task-lib';

import { GCPServiceAccountConnection } from './gcp-service-account-connection';
import { DockerTaskActions } from './docker-task-actions';

export class DockerTask {

    private action: string;
    private gcpServiceAccountId: string;
    private gcpServiceAccount: GCPServiceAccountConnection;
    private dockerFilePath: string;
    private googleContainerRegistry: string;
    private gcpProjectId: string;
    private imageName: string;
    private imageTag: string;
    private useLatestTag: boolean;

    public constructor() {
        this.action = taskLib.getInput('gcpDockerActionSelector', true);

        switch (this.action) {
            case DockerTaskActions.build:
                this.dockerFilePath = taskLib.getInput('dockerFilePath', true);
                break;
            case DockerTaskActions.push:
                this.gcpServiceAccountId = taskLib.getInput('serviceAccountAuthentication', false);
                this.gcpServiceAccount = new GCPServiceAccountConnection(this.gcpServiceAccountId);
                break;
            default:
                // todo: throw error    
        }

        this.googleContainerRegistry = taskLib.getInput('gcpContainerRegistry', true);
        this.gcpProjectId = taskLib.getInput('gcpDockerProjectName', true);
        this.imageName = taskLib.getInput('gcpDockerImageName', true);
        this.imageTag = taskLib.getInput('gcpDockerImageTag', true);
        this.useLatestTag = taskLib.getBoolInput('gcpDockerImageLatestTag', true);
    }

    public run() {
        // console.log('action: ' + this.action);
        // console.log('gcpServiceAccountId: ' + this.gcpServiceAccountId);

        // if (this.gcpServiceAccount) {
        //     console.log('gcpServiceAccount.serviceAccountId: ' + this.gcpServiceAccount.serviceAccountId());
        //     console.log('gcpServiceAccount.keyFileContents: ' + this.gcpServiceAccount.keyFileContents());
        // }
        
        // console.log('dockerFilePath: ' + this.dockerFilePath);
        // console.log('googleContainerRegistry: ' + this.googleContainerRegistry);
        // console.log('gcpProjectId: ' + this.gcpProjectId);
        // console.log('imageName: ' + this.imageName);
        // console.log('imageTag: ' + this.imageTag);
        // console.log('useLatestTag: ' + this.useLatestTag);


        switch (this.action) {
            case DockerTaskActions.build:
                break;
            case DockerTaskActions.push:
                this.gcpServiceAccount.closeConnection();
                break;
            default:
                // todo: throw error    
        }        

        taskLib.setResult(taskLib.TaskResult.Succeeded, 'Success Message!');
    }
}

let dockerTask = new DockerTask();
dockerTask.run();
