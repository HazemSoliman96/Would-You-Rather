import { connect } from 'react-redux';
import { Card, Image, Label, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function Leaderboard(props) {
  const { users } = props;

  const awardColors = ['red', 'blue', 'green'];
  let rank = 0;
  let rankSuffix = ['1st', '2nd', '3rd'];

  const scoreSorted = {};

  Object.keys(users)
    .map((id) => users[id])
    .sort((a, b) => b.score - a.score)
    .forEach((user) => {
      scoreSorted[user.id] = user;
    });

  const userCards = Object.keys(scoreSorted).map((id) => {
    const user = scoreSorted[id];
    let label = null;
    let awardColor = awardColors[rank++];

    if (awardColor) {
      label = {
        as: 'div',
        corner: 'left',
        icon: 'trophy',
        color: awardColor
      };
    }
    const answer = Object.keys(user.answers).length;
    const question = user.questions.length;
    const score = answer + question;
    return (
      <Card key={id}>
        <Image src={user.avatarURL} label={label} />
        <Card.Content>
          <Card.Header>{user.name}</Card.Header>
          <Card.Meta>
            Rank &nbsp;
            <Label size="tiny">
              {rank}
              {rankSuffix.shift() || 'th'}
            </Label>
          </Card.Meta>
          <Card.Description>
            <Grid columns={2} divided style={{ fontSize: '1rem' }}>
              <Grid.Row>
                <Grid.Column floated="left" width={11}>
                  Answered: {answer}
                  <br />
                  Created: {question}
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <div>
                    <strong>Score</strong>
                  </div>
                  <Label circular color={awardColor} size="large">
                    {score}
                  </Label>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  });
  return <Card.Group itemsPerRow={3}>{userCards}</Card.Group>;
}

const mapStateToProps = (state) => {
  return { users: state.users };
};

export default connect(mapStateToProps)(Leaderboard);
