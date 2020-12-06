export interface Vehicle {
    vehicleNumber: number;
    modelId: number;
    currentKilos: number;
    vehiclePicture: string;
    isFunctional: boolean;
    isAvailable: boolean;
    branchId: number;
}
export class VehicleClass implements Vehicle {
    vehicleNumber: number;
    modelId: number;
    currentKilos: number;
    vehiclePicture: string;
    isFunctional: boolean;
    isAvailable: boolean;
    branchId: number;
}
