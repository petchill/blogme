/// <reference types="next" />
/// <reference types="next/types/global" />
declare module '*.module.less' {
  const classes: { [className: string]: string };
  export default classes;
}
