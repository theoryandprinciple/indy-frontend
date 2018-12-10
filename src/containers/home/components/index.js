import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Styles from './styles';

class Home extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number,
    isIncrementing: PropTypes.bool.isRequired,
    isDecrementing: PropTypes.bool.isRequired,
    increment: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    decrementAsync: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <h1>Home</h1>
        <p>Count: {this.props.count}</p>

        <p>
          <button
            onClick={this.props.increment}
            disabled={this.props.isIncrementing}
            id="increment">
            Increment
          </button>
          <button
            onClick={this.props.incrementAsync}
            disabled={this.props.isIncrementing}>
            Increment Async
          </button>
        </p>

        <p>
          <button
            onClick={this.props.decrement}
            disabled={this.props.isDecrementing}>
            Decrement
          </button>
          <button
            onClick={this.props.decrementAsync}
            disabled={this.props.isDecrementing}>
            Decrement Async
          </button>
        </p>

        <p>
          <button onClick={() => this.props.changePage()}>
            Go to about page via redux
          </button>
        </p>
      </div>
    );
  }
}

export default withStyles(Styles)(Home)
