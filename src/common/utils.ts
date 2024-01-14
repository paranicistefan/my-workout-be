import { Repository } from 'typeorm';
import { MyWorkoutBase } from './entities/projectBaseEntity';
import { NotFoundException } from '@nestjs/common';

export const checkResourceExistance = async <T extends MyWorkoutBase>(
  repository: Repository<T>,
  resourceId: string,
) => {
  //@ts-expect-error fee
  const selectedResource = await repository.findOneBy({ id: resourceId });
  if (!selectedResource)
    throw new NotFoundException(
      'The exericse with the provided id was not found',
    );
  return selectedResource;
};

export const mapToIds = (ids: string[]) => ids.map((id) => ({ id }));
