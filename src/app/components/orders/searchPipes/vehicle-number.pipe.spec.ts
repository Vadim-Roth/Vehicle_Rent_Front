import { VehicleNumberPipe } from './vehicle-number.pipe';

describe('VehicleNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new VehicleNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
