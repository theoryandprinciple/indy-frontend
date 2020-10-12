const questions = {
    step1: {
        income: {
            id: '1',
            label: 'Income Qualification',
            options: [
                { id: '0', name: 'I did not report any income to the I.R.S. for 2019' },
                { id: '1', name: 'I got a stimulus check (Economic Impact Payment) in 2020' },
                { id: '2', name: 'I either expect to earn no more than $99,000 in annual income for calendar year 2020 or no more than $198,000 if filing a joint tax return' },
            ],
        },
    },
    step2: {
        govermentAsst: {
            id: '2',
            label: 'Did you do your best to get government help to pay the rent?',
            options: ['Yes', 'No'],
        },
    },
    step3: {
        affordRent: {
            id: '3',
            label: 'Can you afford your rent?',
            options: ['Yes', 'No'],
        },
        affordRentProblems: {
            id: '3a',
            label: 'What is preventing you from paying rent',
            options: [
                { id: '0', name: 'My household lost substantial income' },
                { id: '1', name: 'I lost my job' },
                { id: '2', name: 'My hours were cut' },
                { id: '3', name: 'My salary was reduced' },
                { id: '4', name: 'I have extraordinary medical costs that I pay out of pocket that insurance does not cover' },
                { id: '5', name: 'None of the above' },
            ],
        },
    },
    step4: {
        evictionHealthRisks: {
            id: '4',
            label: 'Would an eviction result in a health risk to you by placing you in unsafe living conditions?',
            options: [
                { id: '0', name: 'I am likely to become homeless' },
                { id: '1', name: 'I will probably need to move into a homeless shelter' },
                { id: '2', name: 'I will probably need to move in with someone else in close quarters' },
                { id: '3', name: 'I do not have any other safe housing choices' },
                { id: '4', name: 'Any other safe housing choices would cost me more money' },
                { id: '5', name: 'I am not at risk of unsafe housing' },
            ],
        },
    },
    step5: {
        tryingToPay: {
            id: '5',
            label: 'I am doing my best to pay as much rent as I can, given my circumstances',
            options: ['Yes', 'No'],
        },
    },
};

export default questions;
