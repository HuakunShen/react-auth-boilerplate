import React, { Component } from 'react';
import '../stylesheets/Home.scss';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

type IState = {
  clickCount: number;
  timer: any;
};

// Type whatever you expect in 'this.props.match.params.*'
type PathParamsType = {};

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {};

class Home extends Component<PropsType, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      clickCount: 0,
      timer: null,
    };
  }

  multipleClickEvent = () => {
    // detect multiple click
    if (!this.state.timer) {
      this.setState({ clickCount: this.state.clickCount + 1 }, () => {
        this.setState({
          timer: setTimeout(() => {
            let dest: null | string = null;
            if (this.state.clickCount === 3) {
              // triple click detected
              dest = '/signin';
            } else if (this.state.clickCount === 4) {
              // quadraple click detected
              dest = '/signup';
            }
            this.setState({ clickCount: 0 });
            this.setState({ timer: null });
            if (dest) this.props.history.push(dest);
          }, 500),
        });
      });
    } else {
      this.setState({ clickCount: this.state.clickCount + 1 });
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.multipleClickEvent);
    console.log(
      '%c Triple Click to go to sign in page ',
      'background: #222; color: #bada55'
    );
    console.log(
      '%c Quadraple Click to go to sign up page ',
      'background: #222; color: #bada55'
    );
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.multipleClickEvent);
  }

  render() {
    return (
      <div className='home-page'>
        <div className='home-container'>
          <span className='text1'>Welcome to</span>
          <span className='text2'>huakunshen.com</span>
        </div>
      </div>
    );
  }
}
export default withRouter(Home);
