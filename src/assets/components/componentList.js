const componentMenu = [
  {
    id: 1,
    list: 1,
    name: "one-section",
    icon: "fa-regular fa-square-full",
    components: [
      {
        name: "Row",
        type: "div",
        classes: [
          {
            name: "grid-x",
          },
          {
            name: "extra-class",
          },
        ],
        components: [
          {
            name: "Cell",
            type: "div",
            classes: [
              {
                name: "cell",
              },
              {
                name: "extra-class",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    list: 1,
    name: "two-section",
    icon: "fa-regular fa-square-full",
    components: [
      {
        name: "Row",
        type: "div",
        classes: [
          {
            name: "grid-x",
          },
          {
            name: "extra-class",
          },
        ],
        components: [
          {
            name: "Cell",
            type: "div",
            classes: [
              {
                name: "cell",
              },
            ],
            components: [
              {
                name: "ballzdeep",
                type: "span",
                classes: [
                  {
                    name: "ballz",
                  },
                ],
              },
            ],
          },
          {
            name: "Cell",
            type: "div",
            classes: [
              {
                name: "cell",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    list: 1,
    name: "foundation-test",
    icon: "fa-regular fa-square-full",
    components: [
      {
        name: "Row",
        type: "div",
        classes: [
          {
            name: "grid-x",
          },
          {
            name: "extra-class",
          },
        ],
        components: [
          {
            name: "Cell",
            type: "div",
            classes: [
              {
                name: "cell medium-6 large-4",
              },
              {
                name: "extra-class",
              },
            ],
          },
          {
            name: "Cell",
            type: "div",
            classes: [
              {
                name: "cell medium-6 large-6",
              },
              {
                name: "extra-class",
              },
            ],
          },
          {
            name: "Cell",
            type: "div",
            classes: [
              {
                name: "cell medium-6 large-2",
              },
              {
                name: "extra-class",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    list: 1,
    name: "forth",
    icon: "fa-regular fa-square-full",
    components: [
      {
        name: "Row",
        type: "div",
        classes: [
          {
            name: "grid-x",
          },
          {
            name: "extra-class",
          },
        ],
        components: [
          {
            name: "Cell",
            type: "div",
            classes: [
              {
                name: "cell",
              },
            ],
            components: [
              {
                name: "ballzdeep",
                type: "span",
                classes: [
                  {
                    name: "ballz",
                  },
                ],
              },
            ],
          },
          {
            name: "Cell",
            type: "div",
            classes: [
              {
                name: "cell",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default componentMenu;
