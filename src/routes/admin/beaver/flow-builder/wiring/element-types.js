export default {
    // used in drag/drop to represent a new question
    // - used in section-element.js to determin presentation
    QUESTION: 'question',

    // used in drag/drop to represent a new output
    // - used in section-element.js to determin presentation
    OUTPUT: 'output',

    // this is an established element in a section
    // - used for reordering during drag
    SECTION_ELEMENT: 'section-element-question',

    // used in drag/drop to represent new and established sections
    // new sections will carry an special id to indicate it's new
    SECTION: 'section',
};
