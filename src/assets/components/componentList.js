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
];

export default componentMenu;
