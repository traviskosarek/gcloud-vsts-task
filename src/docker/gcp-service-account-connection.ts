import * as taskLib from 'vsts-task-lib';

import { GCPServiceAccountConnectionFields } from './gcp-service-account-connection-fields';

export class GCPServiceAccountConnection {

    private _serviceAccountId: string;
    private _keyFileContents: string;
    private _connection: taskLib.EndpointAuthorization;
    private _connectionParameters: { [key: string]: string };
    private _keyFileName: string;

    public get serviceAccountId(): string {
        return this._serviceAccountId;
    }

    public get keyFileContents(): string {
        return this._keyFileContents;
    }

    public get keyFileName(): string {
        return this._keyFileName;
    }

    public constructor(connectionId: string) {
        this._keyFileName = connectionId + '.json';

        this.setConnectionDetails(connectionId);
        this.createAuthenticationFile();
        this.authenticate();
    }

    private setConnectionDetails(connectionId: string) {
        if (connectionId) {
            this._connection = taskLib.getEndpointAuthorization(connectionId, true);
            this._connectionParameters = this._connection.parameters;
            if (this._connection) {
                if (this._connectionParameters[GCPServiceAccountConnectionFields.serviceAccountId]) {
                    this._serviceAccountId = this._connectionParameters[GCPServiceAccountConnectionFields.serviceAccountId];
                }
                else {
                    // todo: throw error
                }

                if (this._connectionParameters[GCPServiceAccountConnectionFields.keyFileContents]) {
                    this._keyFileContents = this._connectionParameters[GCPServiceAccountConnectionFields.keyFileContents];
                }
                else {
                    // todo: throw error
                }
            }
            else {
                // todo: throw error
            }
        }
        else {
            // todo: throw error
        }
    }

    private createAuthenticationFile() {
        taskLib.writeFile(this.keyFileName, this.keyFileContents);
    }

    private authenticate() {
        if (taskLib.exist(this.keyFileName)) {

            // check if gcloud exists, if it does not an exception will be thrown
            taskLib.which('gcloud', true);

            taskLib.ls('-a', ['.']);

            let command = taskLib.tool('gcloud')
                .arg('auth')
                .arg('activate-service-account');
            command.arg(this.serviceAccountId);
            command.arg('--key-file=' + this.keyFileName);
            command.exec();
        }
        else {
            // todo: throw error
        }
    }

    public closeConnection() {
        taskLib.rmRF(this.keyFileName);
    }    
}
