console.log("Let's learn Flexbox!");

// https://cdnjs.com/libraries/dragula/3.6.6 (JS+CSS Required)
const { clear, log } = console;
clear();
const CSS_PROPERTIES = [
    "align-content",
    "align-items",
    "align-self",
    "all",
    "animation",
    "animation-delay",
    "animation-direction",
    "animation-duration",
    "animation-fill-mode",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-timing-function",
    "backface-visibility",
    "background",
    "background-attachment",
    "background-blend-mode",
    "background-clip",
    "background-color",
    "background-image",
    "background-origin",
    "background-position",
    "background-repeat",
    "background-size",
    "border",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-bottom-style",
    "border-bottom-width",
    "border-collapse",
    "border-color",
    "border-image",
    "border-image-outset",
    "border-image-repeat",
    "border-image-slice",
    "border-image-source",
    "border-image-width",
    "border-left",
    "border-left-color",
    "border-left-style",
    "border-left-width",
    "border-radius",
    "border-right",
    "border-right-color",
    "border-right-style",
    "border-right-width",
    "border-spacing",
    "border-style",
    "border-top",
    "border-top-color",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-top-style",
    "border-top-width",
    "border-width",
    "bottom",
    "box-decoration-break",
    "box-shadow",
    "box-sizing",
    "caption-side",
    "caret-color",
    "@charset",
    "clear",
    "clip",
    "color",
    "column-count",
    "column-fill",
    "column-gap",
    "column-rule",
    "column-rule-color",
    "column-rule-style",
    "column-rule-width",
    "column-span",
    "column-width",
    "columns",
    "content",
    "counter-increment",
    "counter-reset",
    "cursor",
    "direction",
    "display",
    "empty-cells",
    "filter",
    "flex",
    "flex-basis",
    "flex-direction",
    "flex-flow",
    "flex-grow",
    "flex-shrink",
    "flex-wrap",
    "float",
    "font",
    "font-family",
    "font-kerning",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "grid",
    "grid-area",
    "grid-auto-columns",
    "grid-auto-flow",
    "grid-auto-rows",
    "grid-column",
    "grid-column-end",
    "grid-column-gap",
    "grid-column-start",
    "grid-gap",
    "grid-row",
    "grid-row-end",
    "grid-row-gap",
    "grid-row-start",
    "grid-template",
    "grid-template-areas",
    "grid-template-columns",
    "grid-template-rows",
    "hanging-punctuation",
    "height",
    "hyphens",
    "isolation",
    "justify-content",
    "left",
    "letter-spacing",
    "line-height",
    "list-style",
    "list-style-image",
    "list-style-position",
    "list-style-type",
    "margin",
    "margin-bottom",
    "margin-left",
    "margin-right",
    "margin-top",
    "max-height",
    "max-width",
    "min-height",
    "min-width",
    "mix-blend-mode",
    "object-fit",
    "object-position",
    "opacity",
    "order",
    "outline",
    "outline-color",
    "outline-offset",
    "outline-style",
    "outline-width",
    "overflow",
    "overflow-x",
    "overflow-y",
    "padding",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
    "page-break-after",
    "page-break-before",
    "page-break-inside",
    "perspective",
    "perspective-origin",
    "pointer-events",
    "position",
    "quotes",
    "resize",
    "right",
    "scroll-behavior",
    "tab-size",
    "table-layout",
    "text-align",
    "text-align-last",
    "text-decoration",
    "text-decoration-color",
    "text-decoration-line",
    "text-decoration-style",
    "text-indent",
    "text-justify",
    "text-overflow",
    "text-shadow",
    "text-transform",
    "top",
    "transform(2D)",
    "transform-origin(two-value syntax)",
    "transform-style",
    "transition",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
    "unicode-bidi",
    "user-select",
    "vertical-align",
    "visibility",
    "white-space",
    "width",
    "word-break",
    "word-spacing",
    "word-wrap",
    "writing-mode",
    "z-index"
]; // https://gist.github.com/cblanquera/9e890e2fef9d7f5b819e0550c26566b4
const colors  = [ "indigo", "blue","green","red","yellow", "pink", "teal", "purple", "sky" ];
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

// HELPER FUNCTIONS:
const $  = document.querySelector.bind( document );
const $$ = document.querySelectorAll.bind( document );
function renderSamplesToEl(propsList, el){
  el.innerHTML = "";
  let counter = 0;
  Object.entries(propsList).forEach(([rule,entries]) =>{
    el.insertAdjacentHTML("beforeEnd", sampleChapter({ title: rule }));
    entries.forEach(({ rule, className, style }) =>{
      el.insertAdjacentHTML("beforeEnd", sampleTemplate({ rule, className, color: colors[counter++ % colors.length] }));
    })
  })
}
function createArrow( from, to, label, { fromAnchor, toAnchor, fromGravity, toGravity } = {}){
  
  const GRAVITY = 48;
  const CORNERS = {
      topLeft: {point: {x: 0, y: 0}, gravity: [-GRAVITY, -GRAVITY]},
      topRight: {point: {x: '100%', y: 0}, gravity: [GRAVITY, -GRAVITY]},
      bottomLeft: {point: {x: 0, y: '100%'}, gravity: [-GRAVITY, GRAVITY]},
      bottomCenter: {point: {x: "50%", y: '100%'}, gravity: [-GRAVITY, GRAVITY]},
      bottomRight: {point: {x: '100%', y: '100%'}, gravity: [GRAVITY, GRAVITY]}
  };

  // https://jsfiddle.net/psum8veb/      
  return new LeaderLine(
    // document.querySelector(from),
    toAnchor? LeaderLine.pointAnchor(
      document.querySelector(from),
      CORNERS[toAnchor].point
    ) : document.querySelector(from),
    
    fromAnchor? LeaderLine.pointAnchor(
      document.querySelector(to),
      CORNERS[fromAnchor].point
    ) : document.querySelector(to),
    {
      startSocketGravity: fromGravity ? CORNERS[fromGravity].gravity : "auto",
      endSocketGravity: toGravity ? CORNERS[toGravity].gravity : "auto",
      dashDISABLED: {
        animation: false
      },
      // endSocket: "top",
      // path: "straight",
      dash: {animation: true},
      dropShadow: true,
      color: "#000",
      middleLabel: label.toString()
    }
  );
}
function check( elA, elB, obj ){

  const compStylesA = getComputedStyle(elA);
  const compStylesB = getComputedStyle(elB);
 
  const hasConflict = CSS_PROPERTIES.some( prop =>{
    const same = compStylesB.getPropertyValue(prop) === compStylesA.getPropertyValue(prop); 
    if ( !same ){
      console.log(prop);
      return true;
    }
    return false;
  });
  
  return !hasConflict;
 

}
function renderPropsToEl( propsList, el ){
  el.innerHTML = "";
  let c = 0;
  Object.entries(propsList).forEach(([key,entries],idx) =>{
    entries.forEach(({ rule, className, style }) =>{
      el.insertAdjacentHTML("beforeEnd", template({
        textContent: style,
        color: colors[c++ % colors.length]
      }));
    })
  })
}
function renderExercises(entry){
  const $expected = $("#expected");
  $expected && $expected.remove();
  $visualExpected.insertAdjacentHTML("beforeEnd", `
    <div id="expected" class="block shadow-lg p-4 ${entry.parentClasses}">
        <div class="block ${entry.itemClasses}">Logo</div>
        <div class="block ${entry.itemClasses}">Menu</div>
        <div class="block ${entry.itemClasses}">Logout</div>
      </div>
  `);
}
function removeMatchedStyle(){
  visualBlocks.classList.remove("matched");    
  expected.classList.remove("matched");    
}
function checkMatch( exercises, exercisesLength ){
  const $expected = $("#expected");
  removeMatchedStyle();
  setTimeout(()=>{
    const match = check( visualBlocks, $expected, { display: "flex", "justify-content": "space-between" });
    if ( match ){
      visualBlocks.classList.add("matched");    
      expected.classList.add("matched");    
      const percentage = 100 - ((exercises.length/exercisesLength) * 100);
      $progress.style.width = percentage + "%";
      // Do we have more exercises to show for this level?
      if ( exercises.length > 0){
        setTimeout(()=>{
            reset();
            removeMatchedStyle();
            renderExercises(exercises.shift());
        }, 2000);
      } else {
        // Check if we have another level to load exercises from
        confettis();
      }
    }
  },350);
}
function reset(){
  visualBlocks.removeAttribute("style");
  renderPropsToEl(propsList, cssPropsEl);
  visualBlocks.classList.remove("matched");    
  expected.classList.remove("matched");    
}
function initExercises(exercisesPack, startFrom = 0){
  const exercisesPackCopy = exercisesPack.slice(startFrom);
  // renderExercises(exercises.shift());
  return function nextExercise(){
    
  }
}
const HINTS = { on: "on", off: "off", hidden: "hidden" }
const flexboxExercisesPack = [
  {
    level: 1,
    title: null,
    cat: "flexbox",
    subcat: "parent-main",
    exercises: [
      {
        parentClasses: "flex justify-between",
        itemClasses: ""
      },
      {
        parentClasses: "flex justify-around",
        itemClasses: ""
      }      
    ],
    hints: HINTS.on
  },
  {
    level: 2,
    title: null,
    cat: "flexbox",
    subcat: "parent-cross",
    exercises: [
      {
        parentClasses: "flex justify-between items-end",
        itemClasses: ""
      }
    ],
    hints: HINTS.hidden
  },
  {
    level: 3,
    title: null,
    cat: "flexbox",
    subcat: "parent-reverse",
    exercises: [
      {
        parentClasses: "flex flex-row-reverse justify-between",
        itemClasses: ""
      }
    ],
    hints: HINTS.off
  }
]

// EXERCISES DATA:
const exercises       = [
  {
    parentClasses: "flex flex-row-reverse justify-between",
    itemClasses: ""
  },
  {
    parentClasses: "flex justify-between",
    itemClasses: ""
  },
  {
    parentClasses: "flex justify-between items-end",
    itemClasses: ""
  },
  {
    parentClasses: "flex justify-around",
    itemClasses: ""
  }
];

// DOM ELEMENTS
const draggables      = $$('[data-class="draggable"]');
const visualBlocks    = $("#visual-blocks");
const $progress       = $("#progress");
const $visualExpected = $("#visual-expected");
const $samples        = $("#samples");
const $samplesList = $("#samples-list");
const visualBlocksDefaultClass = visualBlocks.className;
const $resetBtn       = $("#reset");
const cssPropsEl      = $("#css-props");
const template        = ({textContent, color})=> {
  return `<li class="css-prop bg-${color}-500 hover:bg-${color}-800 inline py-2 px-4 text-white cursor-pointer rounded-full">${textContent}</li>`
};
const sampleChapter   = ({ title })=> {
  return `<h2 class="font-bold px-2 text-2xl">${title}:</h2>`;
}
const sampleTemplate  = ({ rule, className, color })=> {
  return `
    <h3 class="font-bold px-2">${rule}</h3>
    <div class="docs p-1 flex bg-${color}-500 ${className} m-2" id="${rule}">
      <div class="docs-block">A</div>
      <div class="docs-block">B</div>
      <div class="docs-block">C</div>
    </div>
 `;
}
// TODO: Screen size check: < 1280px => Warning!
// TODO: Replicate: https://codepen.io/kostasx/pen/VwZVOMJ
// TODO: Replicate: https://codepen.io/kostasx/pen/wvwQbbd?editors=1100
// https://codepen.io/kostasx/pen/OJLXyBw
// TODO: LEVEL: INTERMEDIATE (HIDE/TOGGLE Samples) => LEVEL (ADVANCED): Hide Samples!!!
// TODO: Update: Level 1 - Exercise 1 => Level 1 - Exercise 2 => Level 2 - Exercise 1
const exercisesLength = exercises.length;
const drake = dragula([...draggables], { copy: true });

renderPropsToEl(propsList, cssPropsEl);
renderSamplesToEl(propsList, $samplesList);
renderExercises(exercises.shift());
initExercises(flexboxExercisesPack,1);

// Guide
let arrow = createArrow('.css-prop:first-child', '#visual-blocks', "Drag CSS rule and drop it onto the parent element",
  { 
    DISABLED_toAnchor: "bottomRight",
    fromAnchor: "bottomCenter",
    DISABLED_toGravity: "topLeft" 
  }
);
let currentlyDraggedEl = null;

$resetBtn.addEventListener("click", reset);
cssPropsEl.addEventListener("click", e =>{
  const el = e.target.classList.contains("css-prop") ? e.target : null;

  if ( el ){
    
    const prop = el.textContent.split(":")[0]; 
    const dashIndex = prop.indexOf("-"); 
    let newStr = prop
    if ( dashIndex > -1 ){
      newStr = prop.replace("-","");
      newStr = newStr.substring(0, dashIndex) + newStr[dashIndex].toUpperCase() + newStr.substring(dashIndex + 1);
    }
    visualBlocks.style[newStr] = "";
    el.style.opacity = 1;
    checkMatch( exercises, exercisesLength );

  }
  
})

drake
.on("drag", function(el,source){
  currentlyDraggedEl = el;
})
.on("dragend", function(){
  currentlyDraggedEl = null;

  if ( arrow ){
    
    try{
      arrow.remove();
      arrow = null;
    } catch(e){
      console.log(e.message);
    }
  }
  checkMatch( exercises, exercisesLength );

})
.on('drop', function(el, target) {
  el.remove();
  const dragElBgClass = Array.from(el.classList).find( c => c.startsWith("bg-"));
  // console.log(dragElBgClass);
  if ( target ){
    currentlyDraggedEl.style.opacity = 0.4;
    target.setAttribute("style", (target.getAttribute('style') ? target.getAttribute('style') : "") + ";" + el.textContent );
  }
  
})
.on("over", function(el, container){
  const dragElBgClass = Array.from(el.classList).find( c => c.startsWith("bg-"));
  if ( dragElBgClass && container.getAttribute("id") === "visual-blocks" ){
    container.classList.add(dragElBgClass);    
  }
})
.on("out", function(el,container){
  const dragElBgClass = Array.from(el.classList).find( c => c.startsWith("bg-"));
  if ( dragElBgClass && container.getAttribute("id") === "visual-blocks" ){
    container.classList.remove(dragElBgClass);    
  }
});

// TODO:
// 1) When Screen width gets lower than accepted for playing the game, display warning modal (Please use a larger screen size, the game was not intended for small screen sizes and mobile devices)
// 2) Add all Flexbox properties, categorized under Parent and Child 
// 3) Keep track of CSS rules applied to the target element (visual-blocks)

// ANIMATION
animation: {
  break animation;
  let $wrapper = document.querySelector(".wrapper");
  let str = "Practice";
  document.addEventListener("DOMContentLoaded", function(){
    for ( let i=0; i < str.length; i++ ){
      setTimeout(function(){
        let $h1 = document.createElement("h1");
        $h1.setAttribute('class','inner txt-pop');
        $h1.textContent = str[i];
        $wrapper.appendChild($h1);
      }, i*150);
    }   
  });
}

// CONFETTIS

let confettis = (function() {
  var H, W, canvas, clamp, colors, context, friction, generator1, generatorStock, gravity, particle, particleGenerator, randomInt, update, utils, wind;

  utils = {
    norm: function(value, min, max) {
      return (value - min) / (max - min);
    },
    lerp: function(norm, min, max) {
      return (max - min) * norm + min;
    },
    map: function(value, sourceMin, sourceMax, destMin, destMax) {
      return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
    },
    clamp: function(value, min, max) {
      return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    },
    distance: function(p0, p1) {
      var dx, dy;
      dx = p1.x - p0.x;
      dy = p1.y - p0.y;
      return Math.sqrt(dx * dx + dy * dy);
    },
    distanceXY: function(x0, y0, x1, y1) {
      var dx, dy;
      dx = x1 - x0;
      dy = y1 - y0;
      return Math.sqrt(dx * dx + dy * dy);
    },
    circleCollision: function(c0, c1) {
      return utils.distance(c0, c1) <= c0.radius + c1.radius;
    },
    circlePointCollision: function(x, y, circle) {
      return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
    },
    pointInRect: function(x, y, rect) {
      return utils.inRange(x, rect.x, rect.x + rect.width) && utils.inRange(y, rect.y, rect.y + rect.height);
    },
    inRange: function(value, min, max) {
      return value >= Math.min(min, max) && value <= Math.max(min, max);
    },
    rangeIntersect: function(min0, max0, min1, max1) {
      return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1);
    },
    rectIntersect: function(r0, r1) {
      return utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) && utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
    },
    degreesToRads: function(degrees) {
      return degrees / 180 * Math.PI;
    },
    radsToDegrees: function(radians) {
      return radians * 180 / Math.PI;
    },
    randomRange: function(min, max) {
      return min + Math.random() * (max - min);
    },
    randomInt: function(min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    }
  };

  canvas = document.getElementById('canvas');

  context = canvas.getContext('2d');

  W = canvas.width = window.innerWidth;

  H = canvas.height = window.innerHeight;

  generatorStock = [];

  gravity = parseFloat(0.2);

  // 1~-1, 0.1
  friction = 0.99;

  // 0.99~0.1, 0.01
  wind = 0;

  // -1~1, 0.1
  colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548'];

  particleGenerator = function(x, y, w, h, number, text) {
    // particle will spawn in this aera
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.number = number;
    this.particles = [];
    this.text = text;
    this.recycle = true;
    this.type = 1;
  };

  particleGenerator.prototype.animate = function() {
    var i, p;
    context.fillStyle = 'grey';
    context.beginPath();
    context.strokeRect(this.x, this.y, this.w, this.h);
    context.font = '13px arial';
    context.textAlign = 'center';
    context.closePath();
    if (this.particles.length < this.number) {
      this.particles.push(new particle(clamp(randomInt(this.x, this.w + this.x), this.x, this.w + this.x), clamp(randomInt(this.y, this.h + this.y), this.y, this.h + this.y), this.text));
    }
    if (this.particles.length > this.number) {
      this.particles.length = this.number;
    }
    i = 0;
    while (i < this.particles.length) {
      p = this.particles[i];
      p.update();
      if (p.y > H || p.y < -100 || p.x > W + 100 || p.x < -100 && this.recycle) {
        //a brand new particle replacing the dead one
        this.particles[i] = new particle(clamp(randomInt(this.x, this.w + this.x), this.x, this.w + this.x), clamp(randomInt(this.y, this.h + this.y), this.y, this.h + this.y), this.text);
      }
      i++;
    }
  };

  generator1 = new particleGenerator(0, 0, W, 0, 100);

  randomInt = function(min, max) {
    return min + Math.random() * (max - min);
  };

  clamp = function(value, min, max) {
    return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
  };

  particle = function(x, y) {
    this.radius = randomInt(.1, 1);
    this.x = x;
    this.y = y;
    this.vx = randomInt(-4, 4);
    this.vy = randomInt(-10, -0);
    this.type = utils.randomInt(0, 1);
    this.w = utils.randomRange(5, 20);
    this.h = utils.randomRange(5, 20);
    this.r = utils.randomRange(5, 10);
    this.angle = utils.degreesToRads(randomInt(0, 360));
    this.anglespin = randomInt(-0.2, 0.2);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.rotateY = randomInt(0, 1);
  };

  update = function() {
    gravity = parseFloat(0.1);
    generator1.number = 100;
    friction = 0.99;
    wind = parseFloat(0);
    context.fillStyle = 'white';
    context.clearRect(0, 0, W, H);
    generator1.animate();
    requestAnimationFrame(update);
  };

  particle.prototype.update = function() {
    var angle, i, x, y;
    this.x += this.vx;
    this.y += this.vy;
    this.vy += gravity;
    this.vx += wind;
    this.vx *= friction;
    this.vy *= friction;
    this.radius -= .02;
    if (this.rotateY < 1) {
      this.rotateY += 0.1;
    } else {
      this.rotateY = -1;
    }
    this.angle += this.anglespin;
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.scale(1, this.rotateY);
    context.rotate(this.angle);
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.lineCap = 'round';
    context.lineWidth = 2;
    if (this.type === 0) {
      context.beginPath();
      context.arc(0, 0, this.r, 0, 2 * Math.PI);
      context.fill();
    } else if (this.type === 2) {
      context.beginPath();
      i = 0;
      while (i < 22) {
        angle = 0.5 * i;
        x = (.2 + 1.5 * angle) * Math.cos(angle);
        y = (.2 + 1.5 * angle) * Math.sin(angle);
        context.lineTo(x, y);
        i++;
      }
      context.stroke();
    } else if (this.type === 1) {
      context.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    }
    context.closePath();
    context.restore();
  };

  update()

});
