import Entity from '../../../database/entities/Entity';

export default interface User extends Entity {
  email: string;
  password: string;
  firstName: string;
}
