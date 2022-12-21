const basicComponents = [
    {
        'id': 1,
        'list': 1,
        'type': 'div',
        'name': 'one-section',
        'icon': 'fa-regular fa-square-full',
        'class': 'columns',
        'pops': {
            'styles': {},
            'minHight': 30,
            'width': '100%'
        },
        'childs': [
            {
                'id': 11,
                'type': 'div',
                'name': 'child 1',
                'fullyResizable': true,
                'pops': {
                    'styles': {},
                    'minHight': 30,
                    'width': '80%'
                },
            },
        ]
    },
    {
        'id': 2,
        'list': 1,
        'type': 'div',
        'name': 'two-section',
        'icon': 'fa-regular fa-square-full',
        'class': 'columns',
        'pops': {
            'styles': {},
            'minHight': 80,
            'width': '100%'
        },
        'childs': [
            {
                'id': 21,
                'type': 'div',
                'name': 'child 1',
                'pops': {
                    'styles': {},
                    'minHight': 30,
                    'width': '80%'
                },
            },
            {
                'id': 22,
                'type': 'div',
                'name': 'child 2',
                'pops': {
                    'styles': {},
                    'minHight': 30,
                    'width': '80%'
                },
            },
        ]
    },
    {
        'id': 3,
        'list': 1,
        'type': 'div',
        'name': 'three-section',
        'icon': 'fa-regular fa-square-full',
        'class': 'columns',
        'pops': {
            'styles': {},
            'minHight': 30,
            'width': '100%'
        },

    },
    {
        'id': 4,
        'list': 1,
        'isLayout': true,
        'type': 'layout',
        'name': 'layout',
        'icon': 'fa-regular fa-square-full',
        'class': 'columns',
        'grid': [
            {
                'type': 'div',
                'foundation': 'grid-x',
                'isContained': true,
                'childs': [
                    {
                        'type': 'div',
                        'foundation': 'cell medium-6 large-8'
                    },
                    {
                        'type': 'div',
                        'foundation': 'cell medium-6 large-4'
                    },
                ]
            },
            {
                'type': 'div',
                'foundation': 'grid-x',
                'isContained': true,
                'childs': [
                    {
                        'type': 'div',
                        'foundation': 'small-6 cell'
                    },
                    {
                        'type': 'div',
                        'foundation': 'small-6 cell'
                    },
                ]
            },
            {
                'type': 'div',
                'foundation': 'grid-x',
                'isContained': false,
                'childs': [
                    {
                        'type': 'div',
                        'foundation': 'medium-6 large-4 cell'
                    },
                    {
                        'type': 'div',
                        'foundation': 'medium-6 large-8 cell'
                    },
                ]
            },
        ],
        'pops': {
            'styles': {},
            'minHight': 30,
            'width': '100%'
        },
        'childs': []
    },
    {
        'id': 5,
        'list': 1,
        'isLayout': true,
        'type': 'layout',
        'name': 'Section',
        'icon': 'fa-regular fa-square-full',
        'class': 'columns',
        'grid': [
            {
                'type': 'div',
                'foundation': 'grid-x',
                'isContained': false,
                'childs': [
                    {
                        'type': 'div',
                        'foundation': 'cell small-12 medium-12 large-12 min-100 hide-content'
                    },
                ]
            },
        ],
        'pops': {
            'styles': {},
            'minHight': 30,
            'width': '100%'
        },
        'childs': []
    },
    {
        'id': 6,
        'list': 1,
        'isLayout': true,
        'type': 'layout',
        'name': 'Container',
        'icon': 'fa-regular fa-square-full',
        'class': 'columns',
        'grid': [
            {
                'type': 'div',
                'foundation': 'grid-x',
                'isContained': true,
                'childs': [
                    {
                        'type': 'div',
                        'foundation': 'cell small-12 medium-12 large-12 min-100 hide-content'
                    },
                ]
            },
        ],
        'pops': {
            'styles': {},
            'minHight': 30,
            'width': '100%'
        },
        'childs': []
    },
]

export default basicComponents
