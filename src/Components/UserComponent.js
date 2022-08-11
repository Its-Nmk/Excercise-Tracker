import React, { Component } from "react";

export class UserComponent extends Component {
  render() {
    const { user, index, deleteHandler } = this.props;
    return (
      <tr className="table-light">
        <th scope="row">{index + 1}</th>
        <td>{user.userName}</td>
        <td>{user.createdAt.split("T")[0]}</td>
        <td className="text-center">
          <a
            href="#"
            onClick={() => {
              deleteHandler(user._id);
            }}
          >
            <i className="fa fa-trash text-danger" aria-hidden="true"></i>
          </a>
        </td>
      </tr>
    );
  }
}

export default UserComponent;
