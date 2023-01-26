import { TableRegistry } from '../../guts/TableRegistry';

/**
 * Only a single attribute can be documented as the id for the object.
 *
 * @param generator function that implements IDGenerator or uuid (v4).
 * @returns 
 */
export function id(): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    TableRegistry.instance().update(target.constructor, { idAttribute: propertyKey });
    return descriptor;
  };
}