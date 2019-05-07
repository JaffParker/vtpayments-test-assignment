export class Canvas {
  constructor(...args: any[]);
  componentDidMount(): void;
  componentWillUnmount(): void;
  forceUpdate(callback: any): void;
  render(): any;
  setState(partialState: any, callback: any): void;
}
export namespace Canvas {
  namespace propTypes {
    function className(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace className {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function options(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace options {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function style(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace style {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
export class Particle {
  constructor(canvas: any, options: any);
  canvas: any;
  ctx: any;
  shape: any;
  color: any;
  precision: any;
  size: any;
  x: any;
  y: any;
  imageOptions: any;
  image: any;
  debug: any;
}
export class Particles {
  constructor(canvas: any, options: any);
  particles: any;
  canvas: any;
  ctx: any;
  precision: any;
  maxParticles: any;
  colors: any;
  shapes: any;
  size: any;
  maxSize: any;
  minSize: any;
  maxSpeed: any;
  minSpeed: any;
  alpha: any;
  particleOptions: any;
  frameRate: any;
  frameInterval: any;
  duration: any;
  debugOptions: any;
  debug: any;
}
export function hasProperty(property: any, object: any): any;
export function importAll(r: any): any;
export function importAllImages(directory: any, ...args: any[]): any;
export function isObject(object: any): any;
