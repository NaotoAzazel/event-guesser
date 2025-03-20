export function CatchErrors() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log(target);
  };
}
