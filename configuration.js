const HINTS  = { 
  baby: "baby",
  on: "on", 
  off: "off", 
  hidden: "hidden" 
}

const colors = ["indigo", "blue", "green", "red", "yellow", "pink", "teal", "purple", "sky"];

const $$parentPropertiesDependencies = { $$dependsOn: "display" }

const flexboxProperties = {
  parent: {
    display: {
      flex: {
        className: "flex",
        style: "display: flex"
      },
      "inline-flex": {
        className: "inline-flex",
        style: "display: inline-flex"
      }
    },
    "flex-direction": {
      ...$$parentPropertiesDependencies,
      $$default: "row",
      row: {
        className: "flex-row",
        style: "flex-direction: row"
      },
      "row-reverse": {
        className: "flex-row-reverse",
        style: "flex-direction: row-reverse"
      },
      column: {
        className: "flex-col",
        style: "flex-direction: column"
      },
      "column-reverse": {
        className: "flex-col-reverse",
        style: "flex-direction: column-reverse"
      }
    },
    "flex-wrap": {
      ...$$parentPropertiesDependencies,
      $$default: "nowrap",
      wrap: {
        className: "flex-wrap",
        style: "wrap"
      },
      "nowrap": {
        className: "flex-nowrap",
        style: "nowrap"
      },
      "wrap-reverse": {
        className: "flex-wrap-reverse",
        style: "wrap-reverse"
      }
    },
    "justify-content":{
      ...$$parentPropertiesDependencies,
      $$default: "flex-start", 
      "flex-start":{
        className: "justify-start",
        style: "justify-content: flex-start"
      },
      "flex-end":{
        className: "justify-end",
        style: "justify-content: flex-end"
      },
      center:{
        className: "justify-center",
        style: "justify-content:center"
      },
      "space-between":{
        className: "justify-between",
        style: "justify-content:space-between"
      },
      "space-around":{
        className: "justify-around",
        style: "justify-content:space-around"
      },
      "space-evenly":{
        className: "justify-evenly",
        style: "justify-content:space-evenly"
      }
    },
    "align-items":{
      ...$$parentPropertiesDependencies,
      $$default: "normal",
      "flex-start": {
        className: "items-start",
        style: "align-items:flex-start"
      },
      "flex-end": {
        className: "items-end",
        style: "align-items:flex-end"
      },
      "center": {
        className: "items-center",
        style: "align-items:center"
      },
      // "baseline": {
      //   className: "",
      //   style: ""
      // },
      // "stretch": {
      //   className: "",
      //   style: ""
      // },
    },
    // "align-content":{
      // ...$$parentPropertiesDependencies,
    //   $$default: "normal",
    //   "flex-start":{
    //     className: "",
    //     style: ""
    //   },
    //   "flex-end":{
    //     className: "",
    //     style: ""
    //   },
    //   "center":{
    //     className: "",
    //     style: ""
    //   },
    //   "space-between":{
    //     className: "",
    //     style: ""
    //   },
    //   "space-around":{
    //     className: "",
    //     style: ""
    //   },
    //   "stretch":{
    //     className: "",
    //     style: ""
    //   }
    // },
    // "gap": {},
    // "row-gap": {},
    // "col-gap": {},
    // "flex-flow":{
    //   $$shorthand: [ "flex-direction", "flex-wrap" ]
    // }
  },
  child: {
    order: {}, // type: integer
    "flex-grow": {},
    "flex-basis": {},
    "flex-shrink": {},
    "align-self": {}
  }
} // Sources: https://flexbox.malven.co/, 

// DEPRECATED LIST:
const propsList = {
  display: [
    {
      rule: "flex",
      className: "flex",
      style: "display:flex"
    }
  ],
  "flex-direction": [
    {
      rule: "row",
      className: "flex-row",
      style: "flex-direction: row"
    },
    {
      rule: "row-reverse",
      className: "flex-row-reverse",
      style: "flex-direction: row-reverse"
    }
  ],
  "justify-content": [
    {
      rule: "center",
      className: "justify-center",
      style: "justify-content:center"
    },
    {
      rule: "space-between",
      className: "justify-between",
      style: "justify-content:space-between"
    },
    {
      rule: "space-around",
      className: "justify-around",
      style: "justify-content:space-around"
    }
  ],
  "align-items": [
    {
      rule: "flex-start",
      className: "items-start",
      style: "align-items:flex-start"
    },
    {
      rule: "center",
      className: "items-center",
      style: "align-items:center"
    },
    {
      rule: "flex-end",
      className: "items-end",
      style: "align-items:flex-end"
    }
  ]
};