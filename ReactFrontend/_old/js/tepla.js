'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

class Topic extends React.component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      summary: '',
      links: ''
    }
  }

  render() {
    
  }
}

class Topics extends React.component {

}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
