import p5 from "p5";

declare module 'p5' {
  export interface p5InstanceExtensions {
    graphics: p5.Graphics
    strokeWeight_(val: number): p5
  }
}
