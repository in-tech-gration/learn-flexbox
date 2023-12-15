// @ts-check
console.log("Let's learn Flexbox!");
/* 
  QUICK DOCS:

  - Project Manager: @kostasx
  - External Libraries:
    - Dragula: https://cdnjs.com/libraries/dragula/3.6.6 (JS+CSS)
    - Emmet: https://github.com/emmetio/emmet
    - Monaco Editor: 0.45.0
    - Emmet for Monaco: https://github.com/troy351/emmet-monaco-es
    - Debug Mode:
      - Music is off

*/

const { clear, log } = console;
const colors = ["indigo", "blue", "green", "red", "yellow", "pink", "teal", "purple", "sky"];
const EXERCISE_UPDATE = "exercise-update";
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
let drake = null;
let arrow = null;
let gotoNextExercise = null;
let music = null;
// CONFIGURATION:
let isPlaying = true;
let debugMode = false; 
let currentLanguage = "en";
// EXERCISES DATA:
let totalExercises = null;
let totalExercisesCounter = null;
let exercises = null;
let exercisesLength;

// PUBSUB
const pubSub = (function(){
  var topics = {};
  var hOP = topics.hasOwnProperty;

  return {
    subscribe: function(topic, listener) {
      if(!hOP.call(topics, topic)) topics[topic] = [];
      let index = topics[topic].push(listener) -1;
      return {
        remove: function() {
          delete topics[topic][index];
        }
      };
    },
    publish: function(topic, info) {
      if(!hOP.call(topics, topic)) return;
      topics[topic].forEach(function(item) {
      		item(info != undefined ? info : {});
      });
    }
  };
})();

// HELPER FUNCTIONS:
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const template = ({ textContent, color }) => {
  return `
  <li data-style="${textContent}" class="css-prop bg-${color}-500 hover:bg-${color}-800 inline py-2 px-4 text-white cursor-pointer rounded-full">
    ${textContent}
  </li>
  `
};
const sampleChapter = ({ title }) => {
  return `
    <h2 class="font-bold px-2 text-xl underline hover:text-blue-700">
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/${title}" target="_blank">${title}:</a>
    </h2>
  `;
}
const sampleTemplate = ({ rule, ruleValue, className, color }) => {
  return `
    <h3 class="font-bold px-2 text-right mr-1">${ruleValue}</h3>
    <div class="docs-draggable">
      <div data-style="${`${rule}:${ruleValue}`}" class="docs p-1 flex bg-${color}-500 ${className} m-2 text-white font-bold" id="${ruleValue}">
        <div class="docs-block">A</div>
        <div class="docs-block">B</div>
        <div class="docs-block">C</div>
      </div>
    <div>
 `;
}
function play( audioFile, loop = false ){
  const audio = new Audio("soundfx/" + audioFile);
  audio.loop = loop;
  !debugMode && audio.play();
  return audio;
}
function renderSamplesToEl(propsList, el) {
  el.innerHTML = "";
  let counter = 0;
  Object.entries(propsList).forEach(([parentRule, entries]) => {
    el.insertAdjacentHTML("beforeEnd", sampleChapter({ title: parentRule }));
    entries.forEach(({ rule: ruleValue, className, style }) => {
      el.insertAdjacentHTML("beforeEnd", sampleTemplate({ rule: parentRule, ruleValue, className, color: colors[counter++ % colors.length] }));
    })
  })
}
function getDraggables() {
  return $$(`.docs-draggable, #visual-blocks, [data-class="draggable"]`);
}
// @ts-ignore
function createArrow(from, to, label, { fromAnchor, toAnchor, fromGravity, toGravity } = {}) {

  const GRAVITY = 48;
  const CORNERS = {
    leftCenter: { point: { x: 0, y: "50%" }, gravity: [-GRAVITY, -GRAVITY] },
    topLeft: { point: { x: 0, y: 0 }, gravity: [-GRAVITY, -GRAVITY] },
    topRight: { point: { x: '100%', y: 0 }, gravity: [GRAVITY, -GRAVITY] },
    bottomLeft: { point: { x: 0, y: '100%' }, gravity: [-GRAVITY, GRAVITY] },
    topCenter: { point: { x: "50%", y: '0%' }, gravity: [-GRAVITY, GRAVITY] },
    bottomCenter: { point: { x: "50%", y: '100%' }, gravity: [-GRAVITY, GRAVITY] },
    bottomRight: { point: { x: '100%', y: '100%' }, gravity: [GRAVITY, GRAVITY] }
  };

  // https://jsfiddle.net/psum8veb/      
  // @ts-ignore
  return new LeaderLine(
    // document.querySelector(from),
    // @ts-ignore
    toAnchor ? LeaderLine.pointAnchor(
      document.querySelector(from),
      CORNERS[toAnchor].point
    ) : document.querySelector(from),

    // @ts-ignore
    fromAnchor ? LeaderLine.pointAnchor(
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
      path: "straight",
      dash: { animation: true },
      dropShadow: true,
      color: "#000",
      middleLabel: label.toString()
    }
  );
}
function check(elA, elB, obj) {

  const compStylesA = getComputedStyle(elA);
  const compStylesB = getComputedStyle(elB);

  const hasConflict = CSS_PROPERTIES.some(prop => {
    const same = compStylesB.getPropertyValue(prop) === compStylesA.getPropertyValue(prop);
    if (!same) {
      // console.log(prop);
      return true;
    }
    return false;
  });

  return !hasConflict;


}
function renderPropsToEl(propsList, el) {
  el.innerHTML = "";
  let c = 0;
  Object.entries(propsList).forEach(([key, entries], idx) => {
    entries.forEach(({ rule, className, style }) => {
      el.insertAdjacentHTML("beforeEnd", template({
        textContent: style,
        color: colors[c++ % colors.length]
      }));
    })
  })
}
function renderExercise(options = {}) {

  const { level, title, cat, subcat, exercise, exerciseNum, hints } = options;
  console.log(hints);

  pubSub.publish(EXERCISE_UPDATE, {
    title: 'Title',
    level,
    exercise: exerciseNum,
    cat: "Cat",
    subcat: "Subcat"
  });

  // @ts-ignore
  const initialInnerHTML = `${expand(exercise.initial)}`;
  // @ts-ignore
  const expectedInnerHTML = `${expand(exercise.expected)}`;

  $initialContainer.innerHTML = `
    <h2 class="p-2 font-bold">Make this...</h2>
    ${initialInnerHTML}
  `

  const $visualBlocks = $("#visual-blocks");
  visualBlocksDefaultClass = $visualBlocks.className;

  if (drake) {
    drake.destroy();
    drake = dragula([...getDraggables()], { copy: true });
    initDrakeEvents()
  }

  const $expected = $("#expected");
  $expected && $expected.remove();

  return $expectedContainer.innerHTML = `
    <h2 class="p-2 font-bold">...look like this</h2>
    ${expectedInnerHTML}
  `;

}
function removeMatchedStyle() {

  const $expected = $("#expected");
  const $visualBlocks = $("#visual-blocks");

  $visualBlocks.classList.remove("matched");
  $expected.classList.remove("matched");

}
function checkMatch(exercises, exercisesLength) {

  const $expected = $("#expected");
  const $visualBlocks = $("#visual-blocks");

  removeMatchedStyle();
  setTimeout(() => {
    
    const match = check($visualBlocks, $expected, { 
      display: "flex", "justify-content": "space-between" 
    });
    
    if (match) {
      console.log(translation[currentLanguage].isMatch);
      // console.log($visualBlocks.outerHTML.toString());
      // console.log($expected.outerHTML.toString());
      const audio = play("mixkit-sword-blade-swish-1506.wav");
      $visualBlocks.classList.add("matched");
      $expected.classList.add("matched");

      // UPDATE PROGRESS:
      const percentage = ((totalExercisesCounter / totalExercises) * 100);
      // const percentage = 100 - ((exercises.length / exercisesLength) * 100); // DEPRECATED
      $progress.style.width = percentage + "%";
      $miniProgress.style.width = percentage + "%";

      // Do we have more exercises to show for this level?
      if (exercises.length > 0) {
        setTimeout(() => {
          reset();
          removeMatchedStyle();
          gotoNextExercise();
          // renderExercise(exercises.shift());
        }, 2000);
      } else {
        // Check if we have another level to load exercises from
        // @ts-ignore
        confettis();
        if ( music ){
          music.pause();
        }
        if ( isPlaying ){
          const audio     = play("mixkit-happy-crowd-cheer-975.wav");
          const completed = play("mixkit-game-level-completed-2059.wav");
        }
      }
    } else {

      console.log(translation[currentLanguage].noMatch);
      // console.log($visualBlocks.outerHTML.toString());
      // console.log($expected.outerHTML.toString());
    }
  }, 350);
}
function reset() {

  // const $draggables        = $$('[data-class="draggable"]');
  const $draggableSamples = $$(".docs-draggable");
  const $visualBlocks = $("#visual-blocks");
  const $expected = $("#expected");

  $visualBlocks.removeAttribute("style");
  renderPropsToEl(propsList, $cssPropsEl);
  // renderSamplesToEl(propsList, $samplesList); // <= Buggy
  $draggableSamples.forEach(el => el.querySelector(".docs").removeAttribute("style"));
  $visualBlocks.classList.remove("matched");
  $expected.classList.remove("matched");

  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "canvas");
  const currentCanvas = document.body.querySelector("canvas#canvas");
  if ( currentCanvas ) currentCanvas.replaceWith(canvas);

}
function emmetToBase64URI( initialEmmetText, expectedEmmetText ){

  const base64 = btoa( initialEmmetText + "|" + expectedEmmetText );
  const encodedBase64 = encodeURIComponent(base64);
  return encodedBase64;

}
function base64URIToEmmet( base64 ){}
function hasUriEncodedExercises(){

    // Sample encoded Emmet: ?exercise=ZGl2I3Zpc3VhbC1ibG9ja3MuYmxvY2sucC00LnNoYWRvdy1sZz5kaXYuYmxvY2t7TG9nb30rZGl2LmJsb2Nre01lbnV9K2Rpdi5ibG9ja3tMb2dvdXR9fGRpdiNleHBlY3RlZC5ibG9jay5wLTQuc2hhZG93LWxnLmZsZXguanVzdGlmeS1iZXR3ZWVuPmRpdi5ibG9ja3tMb2dvfStkaXYuYmxvY2t7TWVudX0rZGl2LmJsb2Nre0xvZ291dH0%3D
    let decodedExercises = null;

    const params = new URLSearchParams(document.location.search);

    for (const [key, value] of params) {
      if ( key === "exercise" ){
        decodedExercises = [atob(value)];
      }
    }

    return decodedExercises;
  
}
function initExercises(exercisesPack, startFrom = 0) {

  const decodedExercises = hasUriEncodedExercises(); 

  $info.innerHTML = "";
  $info.removeAttribute("class");
  $("#visual-expected__bg").classList.add('!opacity-25');

  play("mixkit-dagger-woosh-1487.wav");

  setTimeout(()=>{

    music = play("mixkit-im-working-449.mp3");
    const $soundBar = $(".bar-c"); 
    isPlaying && $soundBar.classList.remove("noAnim");
    $soundBar.addEventListener("click", e =>{
      if ( isPlaying ){
        isPlaying = false;
        $soundBar.classList.add("noAnim");
        music.pause();
      } else {
        isPlaying = true;
        $soundBar.classList.remove("noAnim");
        music.play();
      }
    });
  }, 1000);

  renderPropsToEl(propsList, $cssPropsEl);
  renderSamplesToEl(propsList, $samplesList);

  let exercisesPackCopy = null;

  if ( decodedExercises ){

    console.log("Loading exercise(s) from the URL...");
    const [ initial, expected ] = decodedExercises[0].split("|");
    exercisesPackCopy = [
      {
        level: 1,
        title: null,
        cat: "flexbox",
        subcat: "parent-main",
        hints: "on",
        exercises: [
            {
              initial,
              expected,
              points: 5
            }
        ]

      }
    ];
    
  } else {

    // Get copy of pack of exercises
    exercisesPackCopy = exercisesPack.slice(startFrom);
    
  }
  
  // console.log(exercisesPackCopy);
  const totalLevels = exercisesPackCopy.length;
  // CALCULATE TOTAL
  totalExercises = 0;
  totalExercisesCounter = 0;
  exercisesPackCopy.forEach( level =>{
    totalExercises += level.exercises.length;
  });
  // exercises.length / exercisesLength

  // Get first pack and destructure metadata:
  // console.log(exercisesPackCopy[0]);
  let currentLevelPack = exercisesPackCopy[0];
  let currentExercise = 0;
  const { level = 1 } = currentLevelPack;
  let currentLevel = level;
  exercises = currentLevelPack.exercises;
  exercisesLength = exercises.length;

  function nextExercise() {
    const exercise = exercises.shift();
    const { level, title, cat, subcat, hints = HINTS.on } = currentLevelPack;
    const exerciseNum = ++currentExercise;
    totalExercisesCounter++;

    console.log("Jumping to next exercise...", { level, hints, exerciseNum });

    renderExercise({ 
        level, 
        title, 
        cat, 
        subcat, 
        exerciseNum, 
        hints,
        exercise  
    });    

    if ( exercises.length === 0 ){
      currentExercise = 0;
      currentLevelPack = exercisesPackCopy[currentLevel++];
      if ( currentLevelPack ){
        exercises = currentLevelPack.exercises;
        exercisesLength = exercises.length;
      }
    }

  }

  nextExercise();
  
  // Guide
  if ( !debugMode ){
    // @ts-ignore
    arrow = createArrow('.css-prop:first-child', '#visual-blocks', "Drag CSS rule and drop it onto the parent element", { fromAnchor: "bottomCenter" });
  }
  
  // @ts-ignore
  // arrow = createArrow('#samples-list .docs', '#visual-blocks', "Drag CSS rule and drop it onto the parent element", { fromAnchor: "leftCenter" });

  return nextExercise;

}
function resetAppliedProp(e) {

  const resetPropBubbleEl = e.target.classList.contains("css-prop") ? e.target : null;

  if (resetPropBubbleEl) {

    const $visualBlocks = $("#visual-blocks");
    const prop          = resetPropBubbleEl.innerText.split(":")[0];
    const dashIndex     = prop.indexOf("-");
    let newStr          = prop

    if (dashIndex > -1) {

      newStr = prop.replace("-", "");
      newStr = newStr.substring(0, dashIndex) + newStr[dashIndex].toUpperCase() + newStr.substring(dashIndex + 1);

    }

    $visualBlocks.style[newStr] = "";
    resetPropBubbleEl.style.opacity = 1;
    checkMatch(exercises, exercisesLength);

  }

}
function handleVisualDrop(el, target) {
  el.remove();
  const dragElBgClass = Array.from(el.classList).find(c => c.startsWith("bg-"));
  // console.log(dragElBgClass);
  if (target) {
    currentlyDraggedEl.style.opacity = 0.4;
    const targetStyleAttr = target.getAttribute('style');
    const currentStyle = (targetStyleAttr ? targetStyleAttr.trim() + ";" : "");
    const styleToBeAppended = el.getAttribute("data-style").trim();
    const newStyle = currentStyle + styleToBeAppended;
    target.setAttribute("style", newStyle);
  }
}
function initDrakeEvents() {

  drake
    .on("drag", function (el, source) {
      currentlyDraggedEl = el;
    })
    .on("dragend", function () {
      currentlyDraggedEl = null;

      if (arrow) {

        try {
          arrow.remove();
          arrow = null;
        } catch (e) {
          console.log(e.message);
        }
      }
      checkMatch(exercises, exercisesLength);

    })
    .on('drop', handleVisualDrop)
    .on("over", function (el, container) {
      const dragElBgClass = Array.from(el.classList).find(c => c.startsWith("bg-"));
      if (dragElBgClass && container.getAttribute("id") === "visual-blocks") {
        container.classList.add(dragElBgClass);
      }
    })
    .on("out", function (el, container) {
      const dragElBgClass = Array.from(el.classList).find(c => c.startsWith("bg-"));
      if (dragElBgClass && container.getAttribute("id") === "visual-blocks") {
        container.classList.remove(dragElBgClass);
      }
    });

}
function initMonacoEditor(){

  // @ts-ignore
  require.config({ paths: { vs: 'libs/monaco-editor/min/vs' } });
  // @ts-ignore
  require(['vs/editor/editor.main'], function () {
    // @ts-ignore
    var editor = monaco.editor.create(document.getElementById('monaco-container'), {
      value: [
        '',
        '<main>',
        '  <h1>Hello world!</h1>', 
        '</main>'].join('\n'),
      language: 'html',
      theme: "vs-dark",
      lineNumbers: 'off',
      fontSize: "24px",
      minimap: { enabled: false },
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 0
    });

    // @ts-ignore
    emmetMonaco.emmetHTML(monaco);

  });
}
const HINTS = { on: "on", off: "off", hidden: "hidden" }
const flexboxExercisesPack = [
  {
    level: 1,
    title: null,
    cat: "flexbox",
    subcat: "parent-main",
    hints: HINTS.on,
    exercises: [
      {
        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block.bg-green-200.!outline-none{1.1-Logo}+div.block.bg-green-400.!outline-none{1.1-Menu}+div.block.bg-green-600.!outline-none{1.1-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex>div.block.bg-green-200.!outline-none{1.1-Logo}+div.block.bg-green-400.!outline-none{1.1-Menu}+div.block.bg-green-600.!outline-none{1.1-Logout}`,

        points: 5

      },
      {
        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block.bg-green-200.!outline-none{1.2-Logo}+div.block.bg-green-400.!outline-none{1.2-Menu}+div.block.bg-green-600.!outline-none{1.2-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex>div.block.bg-green-200.!outline-none{1.2-Logo}+div.block.bg-green-400.!outline-none{1.2-Menu}+div.block.bg-green-600.!outline-none{1.2-Logout}`,

        // initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{1.2-Logo}+div.block{1.2-Menu}+div.block{1.2-Logout}`,

        // expected: `div#expected.block.p-4.shadow-lg.flex.flex-row-reverse>div.block{1.2-Logo}+div.block{1.2-Menu}+div.block{1.2-Logout}`,

        points: 5
      }
    ],
  },
  {
    level: 2,
    title: null,
    cat: "flexbox",
    subcat: "parent-cross",
    hints: HINTS.hidden,
    exercises: [
      {
        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block.bg-green-200.!outline-none{2.1-Logo}+div.block.bg-green-400.!outline-none{2.1-Menu}+div.block.bg-green-600.!outline-none{2.1-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex>div.block.bg-green-200.!outline-none{2.1-Logo}+div.block.bg-green-400.!outline-none{2.1-Menu}+div.block.bg-green-600.!outline-none{2.1-Logout}`,

        // initial: `div#visual-blocks.block.p-4.shadow-lg>div.block.bg-green-200.!outline-none{2.1-Logo}+div.block.bg-green-400.!outline-none{2.1-Menu}+div.block.bg-green-600.!outline-none{2.1-Logout}`,

        // expected: `div#expected.block.p-4.shadow-lg.flex.justify-around>div.block.bg-green-200.!outline-none{2.1-Logo}+div.block.bg-green-400.!outline-none{2.1-Menu}+div.block.bg-green-600.!outline-none{2.1-Logout}`,

        points: 10

      },
      {
        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block.bg-green-200.!outline-none{2.2-Logo}+div.block.bg-green-400.!outline-none{2.2-Menu}+div.block.bg-green-600.!outline-none{2.2-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex>div.block.bg-green-200.!outline-none{2.2-Logo}+div.block.bg-green-400.!outline-none{2.2-Menu}+div.block.bg-green-600.!outline-none{2.2-Logout}`,

        // initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{2.2-Logo}+div.block{2.2-Menu}+div.block{2.2-Logout}`,

        // expected: `div#expected.block.p-4.shadow-lg.flex.justify-between.items-end>div.block{2.2-Logo}+div.block{2.2-Menu}+div.block{2.2-Logout}`,

        points: 10

      },
    ]
  },
  {
    level: 3,
    title: null,
    cat: "flexbox",
    subcat: "parent-reverse",
    hints: HINTS.off,
    exercises: [
      {

        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block.bg-green-200.!outline-none{3.1-Logo}+div.block.bg-green-400.!outline-none{3.1-Menu}+div.block.bg-green-600.!outline-none{3.1-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex>div.block.bg-green-200.!outline-none{3.1-Logo}+div.block.bg-green-400.!outline-none{3.1-Menu}+div.block.bg-green-600.!outline-none{3.1-Logout}`,

        // initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{3.1-Logo}+div.block{3.1-Menu}+div.block{3.1-Logout}`,

        // expected: `div#expected.block.p-4.shadow-lg.flex.justify-between.flex-row-reverse>div.block{3.1-Logo}+div.block{3.1-Menu}+div.block{3.1-Logout}`,

        points: 15

      }
    ]
  }
];

// DOM ELEMENTS
const $initialContainer  = $("#initial");
const $cssPropsEl        = $("#css-props");
const $expectedContainer = $("#expected-container");
const $progress          = $("#progress");
const $resetBtn          = $("#reset");
const $samples           = $("#samples");
const $samplesList       = $("#samples-list");
const $visualExpected    = $("#visual-expected");
const $levelNum          = $("#level");
const $exerciseNum       = $("#exercise");
const $info              = $("#info");
const $miniProgress      = $("#level-info__bg"); 
const $cssCode           = $("#css-code");
const $debugMode         = $("#debug-mode");

let visualBlocksDefaultClass;

// SUBSCRIBERS:
pubSub.subscribe(EXERCISE_UPDATE, function(data) {

  // UPDATE EXERCISE + LEVEL NUMBERS:
  $levelNum.textContent = data.level;
  $exerciseNum.textContent = data.exercise;

});
// pubSub.remove();

// PROBLEM: @ts-check + Global Variable + Cannot find name 'dragula'
// SOLUTION: npm install @types/dragula --save 
drake = dragula([...getDraggables()], { copy: true });
initDrakeEvents();

let currentlyDraggedEl = null;

$resetBtn.addEventListener("click", reset);
$cssPropsEl.addEventListener("click", resetAppliedProp);
$info.addEventListener("click", e =>{

  gotoNextExercise = initExercises(flexboxExercisesPack);
  // initExercises(flexboxExercisesPack, 1); // TEST
  
});

if ( debugMode ){
  gotoNextExercise = initExercises(flexboxExercisesPack);
  initMonacoEditor();
  $debugMode.classList.remove("hidden");
  isPlaying = false;
}

var $editorSwitch = document.querySelector('#editor-switch');

if ( $editorSwitch ){
  $editorSwitch.addEventListener( 'click', function() {
    const $card = document.querySelector('.card'); 
    $card && $card.classList.toggle('is-flipped');
  });
}

$debugMode.addEventListener("click", e =>{
  alert(`
    In debug mode: 
    1) Music is off
  `);
});

// gotoNextExercise = initExercises(flexboxExercisesPack);

// ANIMATION
animation: {
  break animation;
  let $wrapper = document.querySelector(".wrapper");
  let str = "Practice";
  document.addEventListener("DOMContentLoaded", function () {
    for (let i = 0; i < str.length; i++) {
      setTimeout(function () {
        let $h1 = document.createElement("h1");
        $h1.setAttribute('class', 'inner txt-pop');
        $h1.textContent = str[i];
        $wrapper.appendChild($h1);
      }, i * 150);
    }
  });
}

// TODO:
// 1) Screen size check: < 1280px => Warning!
// 2) Replicate: https://codepen.io/kostasx/pen/VwZVOMJ
// 3) Replicate: https://codepen.io/kostasx/pen/wvwQbbd?editors=1100
// https://codepen.io/kostasx/pen/OJLXyBw
// 4) LEVEL: INTERMEDIATE (HIDE/TOGGLE Samples) => LEVEL (ADVANCED): Hide Samples!!!
// 5) Update: Level 1 - Exercise 1 => Level 1 - Exercise 2 => Level 2 - Exercise 1
// 6) Ability to drop left-hand-side rules! (Beginner level)
// 7)
// 7.1) When Screen width gets lower than accepted for playing the game, display warning modal (Please use a larger screen size, the game was not intended for small screen sizes and mobile devices)
// 7.2) Add all Flexbox properties, categorized under Parent and Child 
// 7.3) Keep track of CSS rules applied to the target element (visual-blocks)
// 8) Do not checkMatch when the rule is not dropped on a target
