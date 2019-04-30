import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from '@emotion/styled';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { createQuestion } from '../api/endpoints/questions';
import TableRow from '@material-ui/core/TableRow';
import { goBack } from '../Utils/browser';
import { COMPONENT_CONTAINER, BUTTON_CONTAINER, MESSAGE_CONTAINER, BUTTON_SPAN } from './Styles';

const
    CHOICE_DIV = styled.div`
        margin-top: 5px;
        margin-bottom: 15px;
    `,
    REMOVE_ANCHOR = styled.a`
        margin-left: 10px
    `;

class NewQuestion extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            question: '',
            choices: [],
            currentChoice: '',
            isLoading: false,
            message: null,
        };

        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleChoiceChange = this.handleChoiceChange.bind(this);
        this.handleAddChoiceClick = this.handleAddChoiceClick.bind(this);
        this.handleSaveQuestion = this.handleSaveQuestion.bind(this);
    }

    handleQuestionChange(event)
    {
        this.setState({question: event.target.value});
    }

    handleChoiceChange(event)
    {
        this.setState({currentChoice: event.target.value});
    }

    handleAddChoiceClick()
    {
        const {choices, currentChoice} = this.state;

        choices.push(currentChoice);

        this.setState({
            currentChoice: '',
            choices,
        });
    }

    handleRemoveChoice(removedIndex)
    {
        const {choices} = this.state;

        return (event) => {
            event.preventDefault();

            this.setState({
                choices: choices.filter((_, index) => index !== removedIndex),
            });
        }
    }

    handleSaveQuestion()
    {
        const { question, choices } = this.state;
        this.setState({
            isLoading: true
        }, () => {
            createQuestion(question, choices).then(isSuccess => this.setState({
                isLoading: false,
                message: isSuccess ?
                    'Question saved successfully!' :
                    'Error saving question',
            }));
        });
    }

    render()
    {
        const {question, choices, currentChoice, isLoading, message} = this.state;

        return (
            <COMPONENT_CONTAINER>
                <Typography variant="h5" gutterBottom>
                    Create New Question
                </Typography>
                <TextField
                    label="Enter Question"
                    value={question}
                    onChange={this.handleQuestionChange}
                    margin="normal"
                    fullWidth
                />
                <CHOICE_DIV>
                    <TextField
                        label="Enter Option"
                        value={currentChoice}
                        onChange={this.handleChoiceChange}
                        margin="normal"
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={currentChoice === ''}
                        onClick={this.handleAddChoiceClick}
                    >
                        Add Choice
                    </Button>
                </CHOICE_DIV>
                <Typography variant="h6" gutterBottom>
                    Choices:
                </Typography>
                <Table>
                    <TableBody>
                        {choices.map((choice, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">
                                    {choice}
                                    <REMOVE_ANCHOR
                                        href='#'
                                        onClick={this.handleRemoveChoice(index)}
                                    >
                                        (Remove)
                                    </REMOVE_ANCHOR>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <BUTTON_CONTAINER>
                    <BUTTON_SPAN>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSaveQuestion}
                            disabled={question === '' || choices.length === 0 || isLoading}
                        >
                            Save
                        </Button>
                    </BUTTON_SPAN>
                    <BUTTON_SPAN>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => goBack()}
                            disabled={isLoading}
                        >
                            Back
                        </Button>
                    </BUTTON_SPAN>
                </BUTTON_CONTAINER>
                {message && <MESSAGE_CONTAINER>
                    {message}
                </MESSAGE_CONTAINER>}
            </COMPONENT_CONTAINER>
        );
    }
}

export default NewQuestion;