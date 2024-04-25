import { SetMetadata, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse } from '@nestjs/swagger';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]) => {
  // return
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    ApiBearerAuth(...roles),
    ApiForbiddenResponse(),
  );
};
