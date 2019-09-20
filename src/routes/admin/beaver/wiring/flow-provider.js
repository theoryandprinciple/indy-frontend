/* eslint quote-props: 0 */
// Consider breaking local and remote flow data into two providers
// local will be the most active, and only needs to be exposed to the save button
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
} from 'react';

export const FlowDataContext = createContext(null);

const SampleFlowData = {
    'id': 0,
    'title': 'flow title',
    'sections': [
        {
            'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97xa',
            'title': 'this is a section',
            'contents': [
                {
                    'type': 'output',
                    'inputType': 'email',
                    'settings': {
                        'selectedOutput': '85ff9e7d-ac4f-4ac7-800c-3aceb91c97fa',
                        'advanced': {
                            'enableConditionalLogic': true,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [
                                    {
                                        'questionId': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fb',
                                        'condition': 'is',
                                        'answer': 'yes',
                                    },
                                    {
                                        'questionId': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fb',
                                        'condition': 'is not',
                                        'answer': 'yes',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    'title': 'Title of question',
                    'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fa',
                    'type': 'question',
                    'inputType': 'number',
                    'settings': {
                        'enableDescription': true,
                        'description': 'this is my long description',
                        'enableVariableName': true,
                        'variableName': 'donuts',
                        'validation': {
                            'numberType': 'currency',
                            'required': true,
                            'email': true,
                        },
                        'advanced': {
                            'populateDynamically': true,
                            'enableConditionalLogic': true,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [
                                    {
                                        'questionId': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fb',
                                        'condition': 'is',
                                        'answer': 'yes',
                                    },
                                    {
                                        'questionId': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fb',
                                        'condition': 'is not',
                                        'answer': 'yes',
                                    },
                                ],
                            },
                            'enableCalculation': false,
                        },
                    },
                    'answers': [{
                        'value': 'yes',
                    }, {
                        'value': 'no',
                    }],
                },
                {
                    'title': 'Are Dogs Cool?',
                    'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fb',
                    'type': 'question',
                    'inputType': 'checkbox',
                    'settings': {
                        'enableDescription': true,
                        'description': 'this is my long description for are dogs cool',
                        'enableVariableName': true,
                        'variableName': 'dog do nut',
                        'validation': {
                            'required': false,
                            'email': true,
                        },
                        'advanced': {
                            'populateDynamically': true,
                            'enableConditionalLogic': false,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [],
                            },
                            'enableCalculation': false,
                        },
                    },
                    'answers': [{
                        'value': 'yes',
                    }, {
                        'value': 'no',
                    }],
                },
                {
                    'title': 'Question 1',
                    'id': '85ff9e7d-ac4f-4ac7-129c-3aceb91c97fb',
                    'type': 'question',
                    'inputType': 'checkbox',
                    'settings': {
                        'enableDescription': true,
                        'description': 'this is my long description for are dogs cool',
                        'enableVariableName': true,
                        'variableName': 'dog do nut',
                        'validation': {
                            'required': false,
                            'email': true,
                        },
                        'advanced': {
                            'populateDynamically': true,
                            'enableConditionalLogic': false,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [],
                            },
                            'enableCalculation': false,
                        },
                    },
                    'answers': [{
                        'value': 'yes',
                    }, {
                        'value': 'no',
                    }],
                },
                {
                    'title': 'Question 2',
                    'id': '8239e7d-ac4f-4ac7-899c-3aceb91c97fb',
                    'type': 'question',
                    'inputType': 'checkbox',
                    'settings': {
                        'enableDescription': true,
                        'description': 'this is my long description for are dogs cool',
                        'enableVariableName': true,
                        'variableName': 'dog do nut',
                        'validation': {
                            'required': false,
                            'email': true,
                        },
                        'advanced': {
                            'populateDynamically': true,
                            'enableConditionalLogic': false,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [],
                            },
                            'enableCalculation': false,
                        },
                    },
                    'answers': [{
                        'value': 'yes',
                    }, {
                        'value': 'no',
                    }],
                },
                {
                    'title': 'Question 3',
                    'id': '85fweewe7d-ac4f-4ac7-899c-3aceb91c97fb',
                    'type': 'question',
                    'inputType': 'checkbox',
                    'settings': {
                        'enableDescription': true,
                        'description': 'this is my long description for are dogs cool',
                        'enableVariableName': true,
                        'variableName': 'dog do nut',
                        'validation': {
                            'required': false,
                            'email': true,
                        },
                        'advanced': {
                            'populateDynamically': true,
                            'enableConditionalLogic': false,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [],
                            },
                            'enableCalculation': false,
                        },
                    },
                    'answers': [{
                        'value': 'yes',
                    }, {
                        'value': 'no',
                    }],
                },
                {
                    'title': 'Question 4',
                    'id': '85f1111d-ac4f-4ac7-899c-3aceb91c97fb',
                    'type': 'question',
                    'inputType': 'checkbox',
                    'settings': {
                        'enableDescription': true,
                        'description': 'this is my long description for are dogs cool',
                        'enableVariableName': true,
                        'variableName': 'dog do nut',
                        'validation': {
                            'required': false,
                            'email': true,
                        },
                        'advanced': {
                            'populateDynamically': true,
                            'enableConditionalLogic': false,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [],
                            },
                            'enableCalculation': false,
                        },
                    },
                    'answers': [{
                        'value': 'yes',
                    }, {
                        'value': 'no',
                    }],
                },
                {
                    'title': 'Question 5',
                    'id': '85ff9e7d-a1212f-4ac7-899c-3aceb91c97fb',
                    'type': 'question',
                    'inputType': 'checkbox',
                    'settings': {
                        'enableDescription': true,
                        'description': 'this is my long description for are dogs cool',
                        'enableVariableName': true,
                        'variableName': 'dog do nut',
                        'validation': {
                            'required': false,
                            'email': true,
                        },
                        'advanced': {
                            'populateDynamically': true,
                            'enableConditionalLogic': false,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [],
                            },
                            'enableCalculation': false,
                        },
                    },
                    'answers': [{
                        'value': 'yes',
                    }, {
                        'value': 'no',
                    }],
                },
                {
                    'title': 'Question 6?',
                    'id': '85ff9e7d-dsdssd-4ac7-899c-3aceb91c97fb',
                    'type': 'question',
                    'inputType': 'checkbox',
                    'settings': {
                        'enableDescription': true,
                        'description': 'this is my long description for are dogs cool',
                        'enableVariableName': true,
                        'variableName': 'dog do nut',
                        'validation': {
                            'required': false,
                            'email': true,
                        },
                        'advanced': {
                            'populateDynamically': true,
                            'enableConditionalLogic': false,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [],
                            },
                            'enableCalculation': false,
                        },
                    },
                    'answers': [{
                        'value': 'yes',
                    }, {
                        'value': 'no',
                    }],
                },
                {
                    'title': 'Question 7',
                    'id': '85ff9e7d3333f-4ac7-899c-3aceb91c97fb',
                    'type': 'question',
                    'inputType': 'checkbox',
                    'settings': {
                        'enableDescription': true,
                        'description': 'this is my long description for are dogs cool',
                        'enableVariableName': true,
                        'variableName': 'dog do nut',
                        'validation': {
                            'required': false,
                            'email': true,
                        },
                        'advanced': {
                            'populateDynamically': true,
                            'enableConditionalLogic': false,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [],
                            },
                            'enableCalculation': false,
                        },
                    },
                    'answers': [{
                        'value': 'yes',
                    }, {
                        'value': 'no',
                    }],
                },
                {
                    'title': 'Quesiton 8',
                    'id': '85ff9e7d-2323f-4ac7-899c-3aceb91c97fb',
                    'type': 'question',
                    'inputType': 'checkbox',
                    'settings': {
                        'enableDescription': true,
                        'description': 'this is my long description for are dogs cool',
                        'enableVariableName': true,
                        'variableName': 'dog do nut',
                        'validation': {
                            'required': false,
                            'email': true,
                        },
                        'advanced': {
                            'populateDynamically': true,
                            'enableConditionalLogic': false,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [],
                            },
                            'enableCalculation': false,
                        },
                    },
                    'answers': [{
                        'value': 'yes',
                    }, {
                        'value': 'no',
                    }],
                },
                {
                    'title': 'Question 9',
                    'id': '85ff9e7d-11222f-4ac7-899c-3aceb91c97fb',
                    'type': 'question',
                    'inputType': 'checkbox',
                    'settings': {
                        'enableDescription': true,
                        'description': 'this is my long description for are dogs cool',
                        'enableVariableName': true,
                        'variableName': 'dog do nut',
                        'validation': {
                            'required': false,
                            'email': true,
                        },
                        'advanced': {
                            'populateDynamically': true,
                            'enableConditionalLogic': false,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [],
                            },
                            'enableCalculation': false,
                        },
                    },
                    'answers': [{
                        'value': 'yes',
                    }, {
                        'value': 'no',
                    }],
                },
                {
                    'title': 'Question 10',
                    'id': '85ff9e7d-ac4444f-4ac7-899c-3aceb91c97fb',
                    'type': 'question',
                    'inputType': 'checkbox',
                    'settings': {
                        'enableDescription': true,
                        'description': 'this is my long description for are dogs cool',
                        'enableVariableName': true,
                        'variableName': 'dog do nut',
                        'validation': {
                            'required': false,
                            'email': true,
                        },
                        'advanced': {
                            'populateDynamically': true,
                            'enableConditionalLogic': false,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [],
                            },
                            'enableCalculation': false,
                        },
                    },
                    'answers': [{
                        'value': 'yes',
                    }, {
                        'value': 'no',
                    }],
                },
                {
                    'title': 'Question 11',
                    'id': '85ff9e7dddd-4ac7-899c-3aceb91c97fb',
                    'type': 'question',
                    'inputType': 'checkbox',
                    'settings': {
                        'enableDescription': true,
                        'description': 'this is my long description for are dogs cool',
                        'enableVariableName': true,
                        'variableName': 'dog do nut',
                        'validation': {
                            'required': false,
                            'email': true,
                        },
                        'advanced': {
                            'populateDynamically': true,
                            'enableConditionalLogic': false,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [],
                            },
                            'enableCalculation': false,
                        },
                    },
                    'answers': [{
                        'value': 'yes',
                    }, {
                        'value': 'no',
                    }],
                },
                {
                    'title': 'Question 12',
                    'id': '85ff9e7d-555f-4ac7-899c-3aceb91c97fb',
                    'type': 'question',
                    'inputType': 'checkbox',
                    'settings': {
                        'enableDescription': true,
                        'description': 'this is my long description for are dogs cool',
                        'enableVariableName': true,
                        'variableName': 'dog do nut',
                        'validation': {
                            'required': false,
                            'email': true,
                        },
                        'advanced': {
                            'populateDynamically': true,
                            'enableConditionalLogic': false,
                            'conditionalLogic': {
                                'visiblity': 'show',
                                'visiblityCondition': 'all',
                                'conditions': [],
                            },
                            'enableCalculation': false,
                        },
                    },
                    'answers': [{
                        'value': 'yes',
                    }, {
                        'value': 'no',
                    }],
                }],
        },
        {
            'title': 'section title 2',
            'id': '85ff9e7d-ac4f-4ac7-899e-3aceb91c97xb',
            'contents': [{
                'title': 'question 1 title - 1',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fc',
                'type': 'question',
                'inputType': 'radio',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': true,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'all',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            },
            {
                'title': 'question 2 title - 1',
                'id': '85ff9e7d-ac4f-4ac7-899c-3acfb91e97fd',
                'type': 'question',
                'inputType': 'checkbox',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'some',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            }],
        },
        {
            'title': 'section title 2',
            'id': '85ff9e7d-ac4f-4ac7-899f-3aceb91c97xb',
            'contents': [{
                'title': 'question 1 title - 2',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fc',
                'type': 'question',
                'inputType': 'radio',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': true,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'all',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            },
            {
                'title': 'question 2 title - 2',
                'id': '85ff9e7d-ac4f-4ac7-899c-3acgb91e97fd',
                'type': 'question',
                'inputType': 'checkbox',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'some',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            }],
        },
        {
            'title': 'section title 2',
            'id': '85ff9e7d-ac4f-4ac7-899g-3aceb91c97xb',
            'contents': [{
                'title': 'question 1 title - 3',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fc',
                'type': 'question',
                'inputType': 'radio',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': true,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'all',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            },
            {
                'title': 'question 2 title - 3',
                'id': '85ff9e7d-ac4f-4ac7-899c-3achb91e97fd',
                'type': 'question',
                'inputType': 'checkbox',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'some',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            }],
        },
        {
            'title': 'section title 2',
            'id': '85ff9e7d-ac4f-4ac7-899h-3aceb91c97xb',
            'contents': [{
                'title': 'question 1 title - 4',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fc',
                'type': 'question',
                'inputType': 'radio',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': true,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'all',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            },
            {
                'title': 'question 2 title - 4',
                'id': '85ff9e7d-ac4f-4ac7-899c-3acib91e97fd',
                'type': 'question',
                'inputType': 'checkbox',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'some',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            }],
        },
        {
            'title': 'section title 2',
            'id': '85ff9e7d-ac4f-4ac7-899i-3aceb91c97xb',
            'contents': [{
                'title': 'question 1 title - 5',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fc',
                'type': 'question',
                'inputType': 'radio',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': true,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'all',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            },
            {
                'title': 'question 2 title - 5',
                'id': '85ff9e7d-ac4f-4ac7-899c-3acjb91e97fd',
                'type': 'question',
                'inputType': 'checkbox',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'some',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            }],
        },
        {
            'title': 'section title 2',
            'id': '85ff9e7d-ac4f-4ac7-899j-3aceb91c97xb',
            'contents': [{
                'title': 'question 1 title - 6',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fc',
                'type': 'question',
                'inputType': 'radio',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': true,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'all',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            },
            {
                'title': 'question 2 title - 6',
                'id': '85ff9e7d-ac4f-4ac7-899c-3ackb91e97fd',
                'type': 'question',
                'inputType': 'checkbox',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'some',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            }],
        },
        {
            'title': 'section title 2',
            'id': '85ff9e7d-ac4f-4ac7-899k-3aceb91c97xb',
            'contents': [{
                'title': 'question 1 title - 7',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fc',
                'type': 'question',
                'inputType': 'radio',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': true,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'all',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            },
            {
                'title': 'question 2 title - 7',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aclb91e97fd',
                'type': 'question',
                'inputType': 'checkbox',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'some',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            }],
        },
        {
            'title': 'section title 2',
            'id': '85ff9e7d-ac4f-4ac7-899l-3aceb91c97xb',
            'contents': [{
                'title': 'question 1 title - 8',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fc',
                'type': 'question',
                'inputType': 'radio',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': true,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'all',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            },
            {
                'title': 'question 2 title - 8',
                'id': '85ff9e7d-ac4f-4ac7-899c-3acmb91e97fd',
                'type': 'question',
                'inputType': 'checkbox',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'some',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            }],
        },
        {
            'title': 'section title 2',
            'id': '85ff9e7d-ac4f-4ac7-899d-3aceb91c97xb',
            'contents': [{
                'title': 'question 1 title - 9',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fc',
                'type': 'question',
                'inputType': 'radio',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': true,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'all',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            },
            {
                'title': 'question 2 title - 9',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91d97fd',
                'type': 'question',
                'inputType': 'checkbox',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'some',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            }],
        },
    ],
};
const SampleFlowData2 = {
    'id': 0,
    'title': 'flow title 2',
    'sections': [
        {
            'title': 'section title',
            'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97xc',
            'contents': [{
                'title': 'Title of question',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fh',
                'type': 'question',
                'inputType': 'radio',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'hide',
                            'visiblityCondition': 'none',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            },
            {
                'title': 'Are Dogs Cool?',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fe',
                'type': 'question',
                'inputType': 'checkbox',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'some',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            }],
        },
        {
            'title': 'section title 2',
            'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97xd',
            'contents': [{
                'title': 'question 1 title - 10',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97ff',
                'type': 'question',
                'inputType': 'radio',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'hide',
                            'visiblityCondition': 'all',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            },
            {
                'title': 'question 2 title - 10',
                'id': '85ff9e7d-ac4f-4ac7-899c-3aceb91c97fg',
                'type': 'question',
                'inputType': 'checkbox',
                'settings': {
                    'enableDescription': true,
                    'description': 'this is my long description',
                    'enableVariableName': true,
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                    'advanced': {
                        'populateDynamically': true,
                        'enableConditionalLogic': false,
                        'conditionalLogic': {
                            'visiblity': 'show',
                            'visiblityCondition': 'all',
                            'conditions': [],
                        },
                        'enableCalculation': false,
                    },
                },
                'answers': [{
                    'value': 'yes',
                }, {
                    'value': 'no',
                }],
            }],
        },
    ],
};

const FlowDataProvider = (props) => {
    const [localFlowData, setLocalFlowData] = useState({ sections: [] });
    const [remoteFlowData, setRemoteFlowData] = useState(SampleFlowData);

    useEffect(() => {
        setLocalFlowData(remoteFlowData);
    }, [remoteFlowData]);

    useEffect(() => {
        // nothing to do when this updates (yet)
        // console.log('localFlowData', localFlowData)
    }, [localFlowData]);

    const updateLocalFlowData = newFlowData => setLocalFlowData(newFlowData);
    const updateRemoteFlowData = () => {
        setRemoteFlowData(SampleFlowData2);
    };

    return (
        <FlowDataContext.Provider
            value={{
                localFlowData,
                remoteFlowData,
                updateLocalFlowData,
                updateRemoteFlowData,
            }}
            {...props}
        />
    );
};

export const useFlowDataContext = () => useContext(FlowDataContext);


export default FlowDataProvider;
