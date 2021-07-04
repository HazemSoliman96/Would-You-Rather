import { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Form, Image, Input, Message } from 'semantic-ui-react';
import { handleSaveQuestion } from '../actions/shared';
import { useHistory } from 'react-router-dom';

function QuestionNew(props) {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [message, setMessage] = useState({ hidden: true, content: '' });
  const { push } = useHistory();

  const handleOnChangeOne = (e, data) => {
    setOptionOne(data.value);
  };

  const handleOnChangeTwo = (e, data) => {
    setOptionTwo(data.value);
  };

  const handleClick = async () => {
    const { User: author, resetIndexToZero } = props;

    if (!optionOne || !optionTwo) {
      setMessage({
        hidden: false,
        content: 'Please enter the Options.'
      });
      return;
    } else {
      setMessage({
        hidden: true,
        content: ''
      });
    }
    await props.handleSaveQuestion({
      optionOne,
      optionTwo,
      author
    });
    resetIndexToZero();
    push('/');
  };

  const { User, users } = props;
  const user = users[User];

  return (
    <div>
      <Card.Group centered>
        <Card style={{ width: '400px' }}>
          <Card.Content>
            <Image floated="right" size="tiny" src={user.avatarURL} />
            <Card.Header>{user.name} asks</Card.Header>
            <div>Would you rather</div>
            <Card.Description>
              <Form>
                <Form.Field>
                  <Input
                    id="optionOne"
                    placeholder="Enter Option One Text Here"
                    value={optionOne}
                    onChange={handleOnChangeOne}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    id="optionTwo"
                    placeholder="Enter Option One Text Here"
                    value={optionTwo}
                    onChange={handleOnChangeTwo}
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
      </Card.Group>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { users: state.users, User: state.User };
};

export default connect(mapStateToProps, { handleSaveQuestion })(QuestionNew);
