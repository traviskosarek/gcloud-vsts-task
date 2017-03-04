export class GoogleContainerRegistries {
    public static Generic = 'gcr.io';
    public static UnitedStates = 'us.gcr.io';
    public static Asia = 'asia.gcr.io';
    public static Europe = 'eu.gcr.io';

    public static getRegistry(registry: string): string {
        switch (registry) {
            case 'GCPContainerRegistryGeneric':
                return GoogleContainerRegistries.Generic;
            case 'GCPContainerRegistryUnitedStates':
                return GoogleContainerRegistries.UnitedStates;
            case 'GCPContainerRegistryAsia':
                return GoogleContainerRegistries.Asia;
            case 'GCPContainerRegistryEurope':
                return GoogleContainerRegistries.Europe;
            default:
                return GoogleContainerRegistries.Generic;
        }
    }
}