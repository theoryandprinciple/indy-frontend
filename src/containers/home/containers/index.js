import { push } from 'connected-react-router';

import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../../actions/counter';

import { connect } from 'react-redux';
import Home from '../components/';

const internals = {};

internals.connectStuff = connect(
  state => ({
    count: state.counter.count,
    isIncrementing: state.counter.isIncrementing,
    isDecrementing: state.counter.isDecrementing
  }),
  {
    increment: increment,
    incrementAsync: incrementAsync,
    decrement: decrement,
    decrementAsync: decrementAsync,
    changePage: () => push('/about-us')
  }
);

export default internals.connectStuff(Home)
