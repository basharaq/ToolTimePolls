import React from 'react';
import { getQuestion, voteOnChoice } from '../api/endpoints/questions';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { goBack } from '../Utils/browser';
import { COMPONENT_CONTAINER, BUTTON_CONTAINER, MESSAGE_CONTAINER, BUTTON_SPAN } from './Styles';

class QuestionDetails extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            question: null,
            selectedChoiceId: null,
            message: null,
            isLoading:false,
        };

        this.handleChoiceChange = this.handleChoiceChange.bind(this);
        this.handleSaveVote = this.handleSaveVote.bind(this);
    }

    componentWillMount()
    {
        getQuestion(this.props.match.params.id).then(question => this.setState({
            question,
            selectedChoiceId: question.choices[0].id,
            message: question === null ?
                'Error getting question details.' :
                null
        }));
    }

    handleChoiceChange(event)
    {
        this.setState({ selectedChoiceId: event.target.value });
    }

    handleSaveVote()
    {
        const { question, selectedChoiceId } = this.state;

        this.setState({
            message: null,
            isLoading: true
        }, () => voteOnChoice(question.id, selectedChoiceId).then(newChoice => {
            question.choices = question.choices.map(choice => {
                if (choice.id === newChoice.id) {
                    return newChoice;
                }

                return choice
            });

            this.setState({
                question,
                isLoading: false,
                message: question === null ?
                    'Error saving vote.' :
                    'Vote saved successfully.'
            })
        }));
    }

    render()
    {
        const { question, selectedChoiceId, message, isLoading } = this.state;

        if (question === null) {
            return (
                <COMPONENT_CONTAINER>
                    {message && <MESSAGE_CONTAINER>
                        {message}
                    </MESSAGE_CONTAINER>}
                </COMPONENT_CONTAINER>
            );
        }

        const votes = question.choices.reduce(
            (accumulator, choice) => accumulator + parseInt(choice.votes, 10),
            0
        );

        return (
            <COMPONENT_CONTAINER>
                <Typography variant="h5" gutterBottom>
                    Question Details
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Question: {question.text}
                </Typography>
                <Table>
                    <TableBody>
                        {question.choices.map((choice) => {
                            const votePercentage = choice.votes > 0 ?
                                Math.round((choice.votes / votes) * 100) :
                                0;

                            return (
                                <TableRow key={choice.id}>
                                    <TableCell align='center' component="th" scope="row" padding='checkbox'>
                                        <Radio
                                            color="primary"
                                            value={choice.id}
                                            checked={selectedChoiceId === choice.id}
                                            onChange={this.handleChoiceChange}
                                        />
                                    </TableCell>
                                    <TableCell align="left">{choice.text}</TableCell>
                                    <TableCell align="left">{`${choice.votes} Votes (${votePercentage}%)`}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <BUTTON_CONTAINER>
                    <BUTTON_SPAN>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSaveVote}
                            disabled={isLoading}
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

export default QuestionDetails;