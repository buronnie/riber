import Component from './Component';

class Unbatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      child: props.child,
    };
  }

  render() {
    return this.state.child;
  }
}

export default Unbatch;
