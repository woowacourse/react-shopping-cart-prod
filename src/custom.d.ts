declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react';
  const ReactComponent: (props: SVGProps<SVGElement>) => ReactElement;
  export { ReactComponent };
}

declare module '*.gif';

declare module "*.png" {
   const value: any;
   export = value;
}