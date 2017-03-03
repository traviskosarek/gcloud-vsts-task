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

        try {
            switch (this.action) {
                case DockerTaskActions.build:
                    this.dockerFilePath = taskLib.getInput('dockerFilePath', true);
                    taskLib.setResult(taskLib.TaskResult.Succeeded, 'Completing \'' + DockerTaskActions.build + '\'');
                    break;
                case DockerTaskActions.push:
                    this.gcpServiceAccountId = taskLib.getInput('serviceAccountAuthentication', false);
                    this.gcpServiceAccount = new GCPServiceAccountConnection(this.gcpServiceAccountId);
                    taskLib.setResult(taskLib.TaskResult.Succeeded, 'Completing \'' + DockerTaskActions.push + '\'');
                    break;
                default:
                    taskLib.setResult(taskLib.TaskResult.Failed, 'Invalid Docker action set: ' + this.action);
                    return;
            }
        }
        catch (e) {
            taskLib.setResult(taskLib.TaskResult.Failed, e);
        }
        finally {
            this.onComplete();
        }
    }

    private onComplete() {
        try {
            switch (this.action) {
                case DockerTaskActions.build:
                    break;
                case DockerTaskActions.push:
                    this.gcpServiceAccount.closeConnection();
                    break;
                default:
                    taskLib.setResult(taskLib.TaskResult.Failed, 'Invalid Docker action set: ' + this.action);  
            }    
        }
        catch (e) {
            taskLib.setResult(taskLib.TaskResult.Failed, e);
        }
    }
}

let dockerTask = new DockerTask();
dockerTask.run();
