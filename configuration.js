const HINTS  = { 
  baby: "baby",
  on: "on", 
  off: "off", 
  hidden: "hidden" 
}

const colors = ["indigo", "blue", "green", "red", "yellow", "pink", "teal", "purple", "sky"];

const flexboxProperties = {
  parent: {
    display: {
      flex: {
        className: "flex",
        style: "display: flex"
      },
      // "inline-flex": {

      // }
    },
    "flex-direction": {
      $$default: "row",
      row: {
        className: "flex-row",
        style: "flex-direction: row"
      },
      "row-reverse": {
        className: "flex-row-reverse",
        style: "flex-direction: row-reverse"
      },
      // column: {},
      // "column-reverse": {}
    },
    // "flex-wrap": {
    //   $$default: "no-wrap",
    //   wrap: {},
    //   "no-wrap": {},
    //   "wrap-reverse": {}
    // },
    "justify-content":{
      $$default: "flex-start", 
      // "flex-start":{},
      // "flex-end":{},
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
      // "space-evenly":{}
    },
    "align-items":{
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
      // "baseline": {},
      // "stretch": {},
    },
    // "align-content":{
    //   $$default: "normal",
    //   "flex-start":{},
    //   "flex-end":{},
    //   "center":{},
    //   "space-between":{},
    //   "space-around":{},
    //   "stretch":{}
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