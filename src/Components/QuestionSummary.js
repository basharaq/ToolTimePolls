import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from '@emotion/styled';
import { formatDate } from '../Utils/date';

const DIV = styled.div`
    margin: 10px;
    width: 150px;
    cursor: pointer;
`;

const QuestionSummary = (props) => {
    const {question, date, votes, onClick} = props;

    return (
        <DIV onClick={onClick}>
            <Typography variant="h5" gutterBottom>
                {question}
            </Typography>
            <Typography color="textSecondary">
                {formatDate(date)}
            </Typography>
            <Typography color="textSecondary">
                {votes} Votes
            </Typography>
        </DIV>
    );
};

export default QuestionSummary;