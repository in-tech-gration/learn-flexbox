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
const EXERCISE_UPDATE = "exercise-update";

let drake               = null;
let arrow               = null;
let gotoNextExercise    = null;
let music               = null;
let isEditorInitialized = false;
let editor              = null;
let activeContainer     = null;
let extraBgClasses      = null;
// CONFIGURATION:
const visualExpectedDefaultClasses = "p-4 visual border-4 flex-grow";
let isPlaying = true;
let debugMode = false; 
let currentLanguage = "en";
// @ts-ignore
let currentHintState = HINTS.on;
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
      <div data-rule="${rule}" data-style="${`${rule}:${ruleValue}`}" class="docs p-1 flex bg-${color}-500 ${className} m-2 text-white font-bold" id="${ruleValue}">
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

  return Object.entries(propsList).forEach(([parentRule, entries])=>{
    el.insertAdjacentHTML("beforeEnd", sampleChapter({ title: parentRule }));

    Object.entries(entries).forEach(([ruleValue,value])=>{
      if ( ruleValue.startsWith("$$") ){
        return;
      }
      if ( typeof value === "object" ){
        const { className, style } = value;
        el.insertAdjacentHTML("beforeEnd", sampleTemplate({ rule: parentRule, ruleValue, className, color: colors[counter++ % colors.length] }));
      }
    })
  });


  false && Object.entries(propsList).forEach(([parentRule, entries]) => {
    el.insertAdjacentHTML("beforeEnd", sampleChapter({ title: parentRule }));
    entries.forEach(({ rule: ruleValue, className, style }) => {
      el.insertAdjacentHTML("beforeEnd", sampleTemplate({ rule: parentRule, ruleValue, className, color: colors[counter++ % colors.length] }));
    })
  });

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

  // @ts-ignore
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

  return Object.entries(propsList).forEach(([parentRule, entries])=>{

    Object.entries(entries).forEach(([ruleValue,value])=>{
      if ( ruleValue.startsWith("$$") ){
        return;
      }
      if ( typeof value === "object" ){
        const { style } = value;
        el.insertAdjacentHTML("beforeEnd", template({
          textContent: style,
          color: colors[c++ % colors.length]
        }));
  
      }
    })
  });

  false && Object.entries(propsList).forEach(([key, entries], idx) => {
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

  // If the exercise contains custom CSS classes, append them to the default:
  if ( exercise.parentClasses ){
    $visualExpected.classList.add(...exercise.parentClasses.split(" "));
  // Otherwise, just reset to the defaults:
  } else {
    $visualExpected.setAttribute("class", visualExpectedDefaultClasses);
  }

  $samplesList.setAttribute("data-hints", hints);
  $hintsToggler.setAttribute("data-hints", hints);
  $noHints.setAttribute("data-hints", hints);
  $draggableRules.setAttribute("data-hints", hints);
  // @ts-ignore
  currentHintState = HINTS[hints];

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
  // Detect any extra bg-* classes that might exist on the initial/expected examples:
  extraBgClasses = Array.from($visualBlocks.classList).find(c => c.startsWith("bg-"));
  try {
    visualBlocksDefaultClass = $visualBlocks.className;
  } catch(e){
    console.log(e);
    return $expectedContainer.innerHTML = `
    <h2 class="p-2 font-bold text-red-500 text-xl">Ops! Looks that something went wrong with this exercise. Please check your setup.</h2>
    <p class="p-2 font-bold text-red-500">Error message: ${e.message}</p>
    <p class="p-2 font-bold text-red-500">${e.stack}</p>
  `;
  }

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
      // @ts-ignore
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
      // @ts-ignore
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
  renderPropsToEl(flexboxProperties.parent, $cssPropsEl);
  // renderSamplesToEl(flexboxProperties.parent, $samplesList); // <= Buggy?
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
function initMusic(){
  setTimeout(()=>{

    music = play("mixkit-im-working-449.mp3", true);
    // music = play("mixkit-games-worldbeat-466.mp3");
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
}
function initExercises(exercisesPack, startFrom = 0) {

  const decodedExercises = hasUriEncodedExercises(); 

  // Display Level Info:
  $levelInfo.classList.remove("text-gray-400");

  $draggableRules.classList.remove("hidden");
  $controls.classList.remove("hidden");

  $infoContainer.innerHTML = "";
  $infoContainer.removeAttribute("class");
  $("#visual-expected__bg").classList.add('!opacity-25');

  play("mixkit-dagger-woosh-1487.wav");

  initMusic();

  // @ts-ignore
  renderPropsToEl(flexboxProperties.parent, $cssPropsEl);
  // @ts-ignore
  renderSamplesToEl(flexboxProperties.parent, $samplesList);

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
    // @ts-ignore
    const { level, title, cat, subcat, hints = HINTS.on, skip } = currentLevelPack;

    const exerciseNum = ++currentExercise;
    totalExercisesCounter++;

    console.log("Jumping to next exercise...", { level, hints, exerciseNum });

    if ( !exercise.skip ){

      renderExercise({ 
          level, 
          title, 
          cat, 
          subcat, 
          exerciseNum, 
          hints,
          exercise  
      });    

    }

    if ( exercises.length === 0 ){
      currentExercise = 0;
      currentLevelPack = exercisesPackCopy[currentLevel++];
      if ( currentLevelPack ){
        exercises = currentLevelPack.exercises;
        exercisesLength = exercises.length;
      }
    }

    if ( exercise.skip ){
      nextExercise();
    }

  }

  nextExercise();
  
  // Guide
  if ( !debugMode ){
    // @ts-ignore
    // arrow = createArrow('.css-prop:first-child', '#visual-blocks', "Drag CSS rule and drop it onto the parent element", { fromAnchor: "bottomCenter" });

    // arrow = createArrow("#samples-list .docs:first-child", '#visual-blocks', "Drag CSS rule and drop it onto the parent element", { fromAnchor: "bottomCenter" });
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
      const dragElBgClass = Array.from(el.classList).find(c => {
        return c.startsWith("bg-")
      });
      if (dragElBgClass && container.getAttribute("id") === "visual-blocks") {
        console.log({ extraBgClasses });
        if( dragElBgClass !== extraBgClasses ){
          container.classList.remove(dragElBgClass);
          extraBgClasses = null;
        }
      }
    });

}
function initMonacoEditor(){

  if ( isEditorInitialized ){
    return;
  }
  isEditorInitialized = true;
  
  // @ts-ignore
  require.config({ paths: { vs: 'libs/monaco-editor/min/vs' } });
  // @ts-ignore
  require(['vs/editor/editor.main'], function () {
    // @ts-ignore
    editor = monaco.editor.create($('#monaco-container'), {
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

// DOM ELEMENTS
const $about             = $("#about");
const $aboutContainer    = $("#about-container");
const $card              = $('.card'); 
const $controls          = $("#controls");
const $cssCode           = $("#css-code");
const $cssPropsEl        = $("#css-props");
const $debugMode         = $("#debug-mode");
const $draggableRules    = $("#draggable-rules");
const $editorContainer   = $("#monaco-container");
const $editorSwitch      = $('#editor-switch');
const $exerciseNum       = $("#exercise");
const $expectedContainer = $("#expected-container");
const $flipBackBtn       = $(".flip-back")
const $hintsToggler      = $("#hints-toggler");
const $info              = $("#info");
const $infoContainer     = $("#info-container");
const $initialContainer  = $("#initial");
const $instructions      = $("#instructions");
const $instructionsContainer 
                         = $("#instructions-container");
const $levelInfo         = $("#level-info");
const $levelNum          = $("#level");
const $miniProgress      = $("#level-info__bg"); 
const $noHints           = $("#no-hints");
const $progress          = $("#progress");
const $resetBtn          = $("#reset");
const $samples           = $("#samples");
const $samplesList       = $("#samples-list");
const $visualExpected    = $("#visual-expected");

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

  // @ts-ignore
  gotoNextExercise = initExercises(flexboxExercisesPack);
  // initExercises(flexboxExercisesPack, 1); // TEST
  
});
$hintsToggler.addEventListener("click", e =>{

  // console.log("Toggle hints: ", { currentHintState });

  const togglerState = $hintsToggler.getAttribute("data-hints");
  $hintsToggler.removeAttribute("data-hints");
  const samplesListState = $samplesList.getAttribute("data-hints");
  $samplesList.removeAttribute("data-hints");

  setTimeout(()=>{
    $hintsToggler.setAttribute("data-hints", togglerState);
    $samplesList.setAttribute("data-hints", samplesListState);
  }, 3000);

});

if ( debugMode ){
  // @ts-ignore
  gotoNextExercise = initExercises(flexboxExercisesPack);
  $debugMode.classList.remove("hidden");
  isPlaying = false;
}

if ( $editorSwitch ){
  $editorSwitch.addEventListener( 'click', function() {
    initMonacoEditor();
    $card && $card.classList.toggle('is-flipped');
    activeContainer = $editorContainer;
    $editorContainer.classList.remove("hidden");
  });
}

$debugMode.addEventListener("click", e =>{
  alert(`
    In debug mode: 
    1) Music is off
  `);
});

$instructions.addEventListener("click", e =>{
  log("Instructions");
  $card && $card.classList.toggle('is-flipped');
  activeContainer = $instructionsContainer;
  $instructionsContainer.classList.remove("hidden");
});

$about.addEventListener("click", e =>{
  log("About");
  $card && $card.classList.toggle('is-flipped');
  activeContainer = $aboutContainer;
  $aboutContainer.classList.remove("hidden");
});

$flipBackBtn.addEventListener("click", e =>{
  log("Flip back");
  $card && $card.classList.toggle('is-flipped');
  setTimeout(()=>{
    activeContainer.classList.add("hidden");
  }, 1000);
});

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
