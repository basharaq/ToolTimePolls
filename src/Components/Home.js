import React from 'react';
import Grid from '@material-ui/core/Grid';
import QuestionSummary from './QuestionSummary';
import { Link } from 'react-router-dom';
import { getQuestions } from '../api/endpoints/questions';
import Typography from '@material-ui/core/Typography';
import styled from '@emotion/styled';

const
    DIV = styled.div`
        margin-left: 50px;
        margin-right: 50px;
    `,
    GRID_DIV = styled.div`
        margin-top: 20px;
    `;

class Home extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            questions: []
        };
    }

    componentDidMount()
    {
        getQuestions().then(questions => this.setState({questions}));
    }

    render()
    {
        const { questions } = this.state;
        return (
            <DIV>
                <Typography variant="h5" gutterBottom>
                    Questions
                </Typography>
                <Link to={`/new-question`}>
                    (Create a question)
                </Link>
                <GRID_DIV>
                    {questions !== null && <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <Grid container spacing={16}>
                                {questions.map(question => (
                                    <Grid key={question.id}>
                                        <Link
                                            to={`/question/${question.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <QuestionSummary
                                                question={question.text}
                                                date={question.date}
                                                votes={question.votes}
                                            />
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>}
                </GRID_DIV>
            </DIV>
        );
    }
}

export default Home;