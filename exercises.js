// TEST PACK:
const _flexboxExercisesPack = [
  {
    level: 1,
    title: null,
    cat: "flexbox",
    subcat: "parent-main",
    // hints: HINTS.hidden,
    hints: HINTS.baby,
    exercises: [
      {
        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{1.1-Logo}+div.block{1.1-Menu}+div.block{1.1-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex>div.block{1.1-Logo}+div.block{1.1-Menu}+div.block{1.1-Logout}`,

        points: 5

      },
      {
        skip: true,
        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{1.2-Logo}+div.block{1.2-Menu}+div.block{1.2-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex>div.block{1.2-Logo}+div.block{1.2-Menu}+div.block{1.2-Logout}`,

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
    hints: HINTS.on,
    exercises: [
      {
        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{2.1-Logo}+div.block{2.1-Menu}+div.block{2.1-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex>div.block{2.1-Logo}+div.block{2.1-Menu}+div.block{2.1-Logout}`,

        // initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{2.1-Logo}+div.block{2.1-Menu}+div.block{2.1-Logout}`,

        // expected: `div#expected.block.p-4.shadow-lg.flex.justify-around>div.block{2.1-Logo}+div.block{2.1-Menu}+div.block{2.1-Logout}`,

        points: 10

      },
      {
        skip: true,
        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{2.2-Logo}+div.block{2.2-Menu}+div.block{2.2-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex>div.block{2.2-Logo}+div.block{2.2-Menu}+div.block{2.2-Logout}`,

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
    hints: HINTS.hidden,
    exercises: [
      {

        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{3.1-Logo}+div.block{3.1-Menu}+div.block{3.1-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex>div.block{3.1-Logo}+div.block{3.1-Menu}+div.block{3.1-Logout}`,

        // initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{3.1-Logo}+div.block{3.1-Menu}+div.block{3.1-Logout}`,

        // expected: `div#expected.block.p-4.shadow-lg.flex.justify-between.flex-row-reverse>div.block{3.1-Logo}+div.block{3.1-Menu}+div.block{3.1-Logout}`,

        points: 15

      }
    ]
  },
  {
    level: 4,
    title: null,
    cat: "flexbox",
    subcat: "parent-reverse",
    hints: HINTS.off,
    exercises: [
      {

        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{3.1-Logo}+div.block{3.1-Menu}+div.block{3.1-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex>div.block{3.1-Logo}+div.block{3.1-Menu}+div.block{3.1-Logout}`,

        // initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{3.1-Logo}+div.block{3.1-Menu}+div.block{3.1-Logout}`,

        // expected: `div#expected.block.p-4.shadow-lg.flex.justify-between.flex-row-reverse>div.block{3.1-Logo}+div.block{3.1-Menu}+div.block{3.1-Logout}`,

        points: 20

      }
    ]
  }
];

// FULL PACK:
const flexboxExercisesPack = [
  {
    level: 1,
    title: null,
    cat: "flexbox",
    subcat: "parent-main",
    hints: HINTS.baby,
    exercises: [
      {
        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{1.1-Logo}+div.block{1.1-Menu}+div.block{1.1-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex>div.block{1.1-Logo}+div.block{1.1-Menu}+div.block{1.1-Logout}`,

        points: 5

      },
      {
        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{1.2-Logo}+div.block{1.2-Menu}+div.block{1.2-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex.flex-row-reverse>div.block{1.2-Logo}+div.block{1.2-Menu}+div.block{1.2-Logout}`,

        points: 5
      }
    ],
  },
  {
    level: 2,
    title: null,
    cat: "flexbox",
    subcat: "parent-cross",
    hints: HINTS.on,
    exercises: [
      {

        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{2.1-Logo}+div.block{2.1-Menu}+div.block{2.1-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex.justify-around>div.block{2.1-Logo}+div.block{2.1-Menu}+div.block{2.1-Logout}`,

        points: 10

      },
      {

        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{2.2-Logo}+div.block{2.2-Menu}+div.block{2.2-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex.justify-between.items-end>div.block{2.2-Logo}+div.block{2.2-Menu}+div.block{2.2-Logout}`,

        points: 10

      },
      {
        parentClasses: "flex justify-evenly",

        initial: `section#visual-blocks.w-52.!h-fit.p-2.border-2.border-gray-400>.w-1/3.border-4.border-black.aspect-square.grid.place-items-center.text-2xl*9{$}`,

        expected: `section#expected.w-52.!h-fit.flex.flex-wrap.p-2.border-2.border-gray-400>.w-1/3.border-4.border-black.aspect-square.grid.place-items-center.text-2xl*9{$}`
      },
    ]
  },
  {
    level: 3,
    title: null,
    cat: "flexbox",
    subcat: "parent-reverse",
    hints: HINTS.hidden,
    exercises: [
      {

        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{3.1-Logo}+div.block{3.1-Menu}+div.block{3.1-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex.justify-between.flex-row-reverse>div.block{3.1-Logo}+div.block{3.1-Menu}+div.block{3.1-Logout}`,

        points: 15

      }
    ]
  },
  {
    level: 4,
    title: null,
    cat: "flexbox",
    subcat: "parent-reverse",
    hints: HINTS.off,
    exercises: [
      {

        initial: `div#visual-blocks.block.p-4.shadow-lg>div.block{3.1-Logo}+div.block{3.1-Menu}+div.block{3.1-Logout}`,

        expected: `div#expected.block.p-4.shadow-lg.flex.justify-between.flex-row-reverse>div.block{3.1-Logo}+div.block{3.1-Menu}+div.block{3.1-Logout}`,

        points: 20

      }
    ]
  }
];