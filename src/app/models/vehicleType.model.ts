
export interface VehicleType {
    modelId: number;
    manufacturer: string;
    modelName: string;
    dailyCost: number;
    dailyDelay: number;
    prodYear: number;
    gear: string;
}
export class VehicleTypeClass implements VehicleType {
    modelId: number;
    manufacturer: string;
    modelName: string;
    dailyCost: number;
    dailyDelay: number;
    prodYear: number;
    gear: string;
}
