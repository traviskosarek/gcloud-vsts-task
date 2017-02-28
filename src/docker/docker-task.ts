import * as taskLib from 'vsts-task-lib/task';

export class DockerTask {

    private action: string;

    public constructor() {
        this.action = taskLib.getInput('gcpDockerActionSelector');
    }

    public run() {
        taskLib.exec('echo', '********************** start action **********************');
        taskLib.exec('echo', this.action);
        taskLib.exec('echo', '**********************  end action  **********************');
        
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

console.log('************ running ************');

// taskLib.debug('This message will show when debugging is enabled on the build/release.');
// taskLib.error('Invalid inputs!');

// You can use standard console mechanisms, or retrieve a tool runner like echo
// via the tl object: var echo = new taskLib.ToolRunner(taskLib.which('echo', true));
// console.log/error is usually simpler IMO.
// console.log('You said: ' + exampleMessageParameter);

// helper.add(inputAParameter, inputBParameter)
//     .then((sum: number) => {        
//         console.log('The sum is: ' + sum);
//         taskLib.setResult(taskLib.TaskResult.Succeeded, 'Your task passed, hooray!');     
//     })
//     .catch((error: Error) => {
//         taskLib.error('Something failed! Error message: ' + error.message);
//     });

//  async function getTeamProjectCount() {
//      try {
//         var count = await helper.getNumTeamProjects(collectionUri, systemAccessToken);
//         console.log(count);
//         taskLib.setResult(taskLib.TaskResult.Succeeded, 'Got count. Your task passed, hooray!');  
//      } catch (err) {
//         taskLib.error('Something failed! Error message: ' + err.message);
//         taskLib.setResult(taskLib.TaskResult.Failed, 'Addition failed, math is broken :(');
//      }     
//  }
