import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import './Leaderboard.styles.css';

class LeaderboardComponent extends PureComponent {
  renderUser = (user) => {
    return (
      <li
        className="leaderboard-user"
        key={user.id}
      >
        <div className="leaderboard-user-info">
          <figure className="leaderboard-user-avatar">
            <img src={user.avatarURL} alt={user.name} />
          </figure>
          <span className="leaderboard-username">
            {user.name}
          </span>
        </div>
        <div className="leaderboard-points">
          <span>
            Questions asked: {user.questions.length}
          </span>
          <span>
            Questions answered: {Object.getOwnPropertyNames(user.answers).length}
          </span>
        </div>
      </li>
    );
  }

  render() {
    const { renderUser } = this;
    const { users } = this.props;

    return (
      <div className="container leaderboard">
        <h1>
          Leaderboard
        </h1>
        <ul className="leaderboard-list">
          {users.sort((a, b) => {
            const pointsA = a.questions.length + Object.getOwnPropertyNames(a.answers).length;
            const pointsB = b.questions.length + Object.getOwnPropertyNames(b.answers).length;

            return pointsB - pointsA;
          }).map(user => renderUser(user))}
        </ul>
      </div>
    );
  }
}

export default connect(state => (
  {
    users: state.users,
    questions: state.questions,
  }
))(LeaderboardComponent);
