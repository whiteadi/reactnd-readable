import React, {Component} from 'react';
import Confirm from 'react-confirm-bootstrap';
import PropTypes from "prop-types";

class ConfirmAction extends Component {
  onConfirm = () => {
    this.props.delete(this.props.id, this.props.postId);
    this.props.refreshParent();
  };

  render() {
    return (
      <Confirm
        onConfirm={this.onConfirm}
        body="Are you sure you want to delete this?"
        confirmText="Confirm Delete"
        title="Deleting Stuff">
        <button>Delete</button>
      </Confirm>
    )
  }
}

ConfirmAction.propTypes = {
  delete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  refreshParent: PropTypes.func
};

export default ConfirmAction;