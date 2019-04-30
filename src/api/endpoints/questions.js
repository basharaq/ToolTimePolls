import { createRequest } from '../config';

export function createQuestion(question, choices)
{
    const request = createRequest(`questions`, 'POST', { question, choices });

    return fetch(request.url, request).then(response => {
        if (!response.ok) {
            return Promise.resolve(false);
        }

        return Promise.resolve(true);
    })
}

export function getQuestions()
{
    const request = createRequest(`questions`, 'GET');

    return fetch(request.url, request).then(response => {
        if (!response.ok) {
            return Promise.resolve(null);
        }

        return response.json();
    }).then(data => Promise.resolve(data.map(item => createQuestionObject(item))));
}

export function getQuestion(id)
{
    const request = createRequest(`questions/${id}`, 'GET');

    return fetch(request.url, request).then(response => {
        if (!response.ok) {
            return Promise.resolve(null);
        }

        return response.json();
    }).then(data => {
        const question = createQuestionObject(data);
        question.choices = data.choices.map(choice => createChoiceObject(choice));

        return Promise.resolve(question);
    });
}

export function voteOnChoice(questionId, choiceId)
{
    const request = createRequest(`questions/${questionId}/choices/${choiceId}`, 'POST');

    return fetch(request.url, request).then(response => {
        if (!response.ok) {
            return Promise.resolve(null);
        }

        return response.json();
    }).then(data => Promise.resolve(createChoiceObject(data)));
}

function createQuestionObject(rawObject)
{
    const
        votes = rawObject.choices.reduce(
            (accumulator, choice) => accumulator + parseInt(choice.votes, 10),
            0
        ),
        urlSpit = rawObject.url.split('/');

    return {
        id: urlSpit[2],
        text: rawObject.question,
        date: new Date(rawObject.published_at),
        url: rawObject.url,
        votes: votes,
    }
}

function createChoiceObject(rawObject)
{
    const urlSpit = rawObject.url.split('/');

    return {
        id: urlSpit[4],
        text: rawObject.choice,
        votes: rawObject.votes,
    }
}