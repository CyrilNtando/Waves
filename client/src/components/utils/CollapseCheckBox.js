import React, { Component } from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

class CollapseCheckBox extends Component {
  state = {
    open: false,
    checked: []
  };

  componentDidMount() {
    if (this.props.initState) {
      this.setState({
        open: this.props.initState
      });
    }
  }
  handleAngle = () => {
    return this.state.open ? (
      <FontAwesomeIcon icon={faAngleUp} />
    ) : (
      <FontAwesomeIcon icon={faAngleDown} />
    );
  };

  handleClick = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  renderList = () => {
    return this.props.list
      ? this.props.list.map(value => (
          <ListItem key={value._id}>
            <ListItemText primary={value.name} />
            <ListItemSecondaryAction>
              <Checkbox
                color='primary'
                onChange={this.handleToggle.bind(this, value._id)}
                checked={this.state.checked.indexOf(value._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;
  };

  handleToggle(value) {
    this.setState(state => {
      const { checked } = state;
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      this.props.handleFilters(newChecked);
      return { checked: newChecked };
    });
  }
  render() {
    return (
      <div className='collapse_items_wrapper'>
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: '10px 23px 10px 0' }}
          >
            <ListItemText
              primary={this.props.title}
              className='collapse_title'
            />
            {this.handleAngle()}
          </ListItem>
          <Collapse in={this.state.open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseCheckBox;
