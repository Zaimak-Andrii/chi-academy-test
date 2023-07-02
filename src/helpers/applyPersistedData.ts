import { ICar, IPersistedCars } from '@/types/cars.types';

export const applyPersistedData = (cars: ICar[], persistedCars: IPersistedCars[]) => {
  // add new cars (created in app)
  const newCarsFromPersist = () =>
    persistedCars
      .filter(({ id, status }) => id > cars.length && status !== 'delete')
      .map(({ status: _, ...otherCarProprty }) => ({ ...otherCarProprty }));

  return cars.reduce<ICar[]>((acc, car) => {
    const findCar = persistedCars.find(({ id }) => id === car.id);

    if (findCar) {
      const { status, ...otherCarProperty } = findCar;

      if (status === 'update') {
        acc.push({ ...car, ...otherCarProperty });
      } else if (status === 'delete') {
        return acc;
      }
    } else {
      acc.push(car);
    }

    return acc;
  }, newCarsFromPersist());
};
