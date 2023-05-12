import Entity from './Entity';
import { ObjectId } from 'typeorm';

export default class BaseEntity implements Entity {
  _id: any;

  get id(): any {
    return this._id;
  }

  set id(value: any) {
    this._id = value;
  }

  static getPropertiesObjectFromDto(DTO: Record<any, any>): Record<any, any> {
    // We set as policy that the name of the properties is always _nameProperty
    const properties = {};
    Object.entries(DTO).forEach(([key, value]) => {
      properties[`_${key}`] = value;
    });
    return properties;
  }
}
