import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        initialState: false,
        nameQuestionState: false,
        quizState: false,
        resultState: false,
        userName: '',
        introductionMessages: [
            "Welcome, young witch 🧙‍♀️ or wizard 🧙‍♂️, to the enchanted halls of Hogwarts School of Witchcraft and Wizardry 🏰!",
            "I am the Sorting Hat, here to determine which of the four noble houses you belong to.",
            "Will it be brave Gryffindor 🦁, wise Ravenclaw 🦅, cunning Slytherin 🐍, or loyal Hufflepuff 🦡?",
            "Answer my questions truthfully, and I shall reveal where you truly belong.",
            "Let's embark on this magical journey ✨ together. But first, I need to know your name."
        ]
    },
    mutations: {
        SET_INITIAL_STATE(state, newState) {
            state.initialState = newState;
        },
        SET_NAME_QUESTION_STATE(state, newState) {
            state.nameQuestionState = newState;
        },
        SET_QUIZ_STATE(state, newState) {
            state.quizState = newState;
        },
        SET_RESULT_STATE(state, newState) {
            state.resultState = newState;
        },
        SET_USER_NAME(state, newState) {
            state.userName = newState;
        },
    },
    actions: {
    }
});
