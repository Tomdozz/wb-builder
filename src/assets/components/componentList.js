const componentMenu = [
  {
    id: 1,
    list: 1,
    name: "one-section",
    icon: "fa-regular fa-square-full",
    components: [
      {
        name: "Row",
        htmlType: "div",
        type: "regular",
        fullyResizable: true,
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
            htmlType: "div",
            type: "regular",
            fullyResizable: true,
            rezizers: "top,,bottom,",
            initWidth: -1,
            initialHeigt: 80,
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
        htmlType: "div",
        type: "regular",
        fullyResizable: true,
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
            htmlType: "div",
            type: "regular",
            fullyResizable: true,
            classes: [
              {
                name: "cell",
              },
            ],
            components: [
              {
                name: "ballzdeep",
                htmlType: "span",
                type: "regular",
                fullyResizable: true,
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
            htmlType: "div",
            type: "regular",
            fullyResizable: true,
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
        htmlType: "div",
        type: "regular",
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
            htmlType: "div",
            type: "regular",
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
            htmlType: "div",
            type: "regular",
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
            htmlType: "div",
            type: "regular",
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
    name: "Text",
    icon: "fa-regular fa-square-full",
    components: [
      {
        name: "Text",
        htmlType: "span",
        type: "text",
        classes: [
          {
            name: "text",
          },
          {
            name: "extra-class",
          },
        ],
        components: [],
      },
    ],
  },
  {
    id: 5,
    list: 1,
    name: "H2",
    icon: "fa-regular fa-square-full",
    components: [
      {
        name: "Text",
        htmlType: "h2",
        type: "text",
        classes: [
          {
            name: "text",
          },
          {
            name: "extra-class",
          },
        ],
        components: [],
      },
    ],
  },
];

export default componentMenu;
