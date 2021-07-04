import { connect } from 'react-redux';
import {
  Card,
  Image,
  Segment,
  Label,
  Progress,
  Button,
  Form,
  Radio,
  Message
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { handleAnswer } from '../actions/shared';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function QuestionView(props) {
  const [vote, setVote] = useState(null);
  const [message, setMessage] = useState({ hidden: true, content: '' });
  const { push } = useHistory();

  const handleChange = (e, data) => {
    setVote(data.value);
  };

  const handleClick = () => {
    if (!vote) {
      setMessage({
        hidden: false,
        content: 'Please select an option'
      });
      return;
    } else {
      setMessage({
        hidden: true,
        content: ''
      });
    }

    const id = props.match.params.question_id;
    const answer = vote;
    const { User, handleAnswer } = props;
    handleAnswer({ User, id, answer });
  };

  const questionResult = () => {
    const id = props.match.params.question_id;
    const { User, questions, users } = props;

    const question = questions[id];
    if (!question) {
      return;
    }

    const user = users[question.author];

    const votesOptionOne = question.optionOne.votes.includes(User);
    const votesOptionTwo = question.optionTwo.votes.includes(User);
    const CountOptionOne = question.optionOne.votes.length;
    const CountOptionTwo = question.optionTwo.votes.length;
    const totalVotes = CountOptionOne + CountOptionTwo;
    const PercentOptionOne =
      Math.round((CountOptionOne / totalVotes) * 10000) / 100;
    const PercentOptionTwo =
      Math.round((CountOptionTwo / totalVotes) * 10000) / 100;

    return (
      <Card key={id} style={{ width: '300px' }}>
        <Card.Content>
          <Image floated="right" size="tiny" src={user.avatarURL} />
          <Card.Header>{user.name} asks</Card.Header>
          <div>Would you rather</div>
          <Card.Description>
            <Segment>
              {votesOptionOne && (
                <Label as="a" color="red" ribbon="right">
                  Your Vote
                </Label>
              )}
              <p>{question.optionOne.text}</p>
              <Progress percent={PercentOptionOne} progress>
                {CountOptionOne} out of {totalVotes} votes
              </Progress>
            </Segment>
            <Segment>
              {votesOptionTwo && (
                <Label color="red" ribbon="right">
                  Your Vote
                </Label>
              )}
              <p>{question.optionTwo.text}</p>
              <Progress percent={PercentOptionTwo} progress>
                {CountOptionTwo} out of {totalVotes} votes
              </Progress>
            </Segment>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  };

  const questionAnswer = () => {
    const id = props.match.params.question_id;
    const { questions, users } = props;

    const question = questions[id];
    if (!question) {
      return;
    }

    const user = users[question.author];

    return (
      <Card key={id} style={{ width: '350px' }}>
        <Card.Content>
          <Image floated="right" size="tiny" src={user.avatarURL} />
          <Card.Header>{user.name} asks</Card.Header>
          <div>Would you rather</div>
          <Card.Description>
            <Form>
              <Form.Field>
                <Radio
                  label={question.optionOne.text}
                  name="radioGroupVote"
                  value="optionOne"
                  checked={vote === 'optionOne'}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label={question.optionTwo.text}
                  name="radioGroupVote"
                  value="optionTwo"
                  checked={vote === 'optionTwo'}
                  onChange={handleChange}
                />
              </Form.Field>
              <Message hidden={message.hidden} negative>
                {message.content}
              </Message>
            </Form>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="black" onClick={handleClick}>
              Submit
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  };

  const didAnswer = () => {
    const { User, questions } = props;
    const id = props.match.params.question_id;

    const question = questions[id];
    if (!question) {
      return null;
    }

    return (
      question.optionOne.votes.includes(User) ||
      question.optionTwo.votes.includes(User)
    );
  };

  useEffect(() => {
    const { questions } = props;
    const id = props.match.params.question_id;

    const question = questions[id];
    if (!question) {
      push('/404');
    }
  }, [props, push]);

  let result;
  if (didAnswer() === true) {
    result = questionResult();
  } else {
    result = questionAnswer();
  }
  return <Card.Group centered>{result}</Card.Group>;
}

const mapStateToProps = (state) => {
  return {
    User: state.User,
    questions: state.questions,
    users: state.users
  };
};

export default connect(mapStateToProps, { handleAnswer })(QuestionView);
