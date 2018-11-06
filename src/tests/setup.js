// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// https://redux.js.org/recipes/writingtests
// https://airbnb.io/enzyme/docs/installation/index.html
// https://devhints.io/enzyme

configure({ adapter: new Adapter() });
// end setup
