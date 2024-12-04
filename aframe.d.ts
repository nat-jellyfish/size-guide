// // src/aframe.d.ts
// declare namespace JSX {
//     interface IntrinsicElements {
//       'a-scene': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
//         embedded?: boolean;
//         arjs?: string;
//         loading?: string;
//       };
//       'a-marker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
//         preset?: string;
//         position?: string;
//         on?: string;
//         type?: string;
//         value?: string;
//       };
//       'a-box': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
//         position?: string;
//         material?: string;
//         scale?: string;
//       };
//       'a-entity': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
//         camera?: boolean;
//       };
//     }
//   }
  
// src/types/global.d.ts
declare var THREE: typeof import("three");
declare var THREEx: typeof any;