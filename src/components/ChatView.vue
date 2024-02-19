<template>
    <div class="chat-window-container">

        <div class="chat-window">
            <transition-group name="chat-line" tag="div">
            </transition-group>
            <ChatLine v-for="(line, index) in chatLines" :key="index" :text="line.text" :isUser="line.isUser" />
        </div>

        <text-response v-if="nameQuestionState" @name-typed="handleNameTyped">
        </text-response>

        <answer-picker v-if="quizState && showQuiz" :question="currentQuestion" @answer-selected="handleAnswerSelected">
        </answer-picker>

        <div class="go-bottom" @click="scrollToBottomSmoothly">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                <g id="SVGRepo_iconCarrier">
                    <path d="M7 10L12 15L17 10" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </g>
            </svg>
        </div>

    </div>
</template>
  
<script>
import ChatLine from './ChatLine.vue';
import AnswerPicker from './AnswerPicker.vue';
import TextResponse from './TextResponse.vue';

export default {
    props: {
        questions: Array
    },

    components: {
        ChatLine,
        AnswerPicker,
        TextResponse
    },

    data: () => ({
        currentQuestionIndex: 0,
        newMessage: '',
        chatLines: [],
        showQuizComponent: false
    }),

    computed: {
        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },
        initialState() {
            return this.$store.state.initialState;
        },
        nameQuestionState() {
            return this.$store.state.nameQuestionState;
        },
        quizState() {
            return this.$store.state.quizState;
        },
        showQuiz() {
            return this.showQuizComponent;
        },
        isLastQuestion() {
            return (this.currentQuestionIndex == (this.questions.length - 1));
        }

    },

    watch: {
        async currentQuestion() {
            this.showCurrentQuestion();
        },
        async initialState(newValue) {
            if (newValue) {
                const messages = this.$store.state.introductionMessages;
                for (let i = 0; i < messages.length; i++) {
                    await this.addBotMessage(messages[i]);
                }
                this.$store.commit("SET_INITIAL_STATE", false);
                this.$store.commit("SET_NAME_QUESTION_STATE", true);
            }
        }
    },

    methods: {
        async handleAnswerSelected(answer) {
            await this.addUserMessage(answer["title"]);
            this.$emit('points-earned', answer["scores"]);

            if (!this.isLastQuestion) {
                this.nextQuestion();
            } else {
                this.showFinalResult();
            }
        },
        nextQuestion() {
            this.showQuizComponent = false;
            this.currentQuestionIndex++; // currentQuestion will be recalculated
        },
        async handleNameTyped(name) {
            this.$store.commit("SET_USER_NAME", name);
            await this.addUserMessage(name);
            this.$store.commit("SET_NAME_QUESTION_STATE", false);
            await this.addBotMessage("Perfect " + name + " !!! Let's begin your sorting ceremony")
            this.startQuiz();
        },
        async startQuiz() {
            this.$store.commit("SET_QUIZ_STATE", true);
            this.showCurrentQuestion();
        },
        async showCurrentQuestion() {
            const newBotText = this.questions[this.currentQuestionIndex]["title"];
            await this.addBotMessage(newBotText);
            setTimeout(() => {
                this.showQuizComponent = true;
                this.scrollToBottom();
            }, 1000);
        },
        showFinalResult() {
            this.$store.commit("SET_QUIZ_STATE", false);
            this.$store.commit("SET_RESULT_STATE", true);
        },
        addBotMessage(message) {
            return new Promise(resolve => {
                setTimeout(() => {
                    this.chatLines.push({ text: message, isUser: false });
                    this.scrollToBottom();
                    resolve();
                }, 500);
            });
        },
        addUserMessage(message) {
            return new Promise(resolve => {
                setTimeout(() => {
                    this.chatLines.push({ text: message, isUser: true })
                    this.scrollToBottom();
                    resolve();
                }, 20);
            });
        },
        scrollToBottomSmoothly() {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        },
        scrollToBottom() {
            const start = window.pageYOffset;
            const end = document.body.scrollHeight;
            const change = end - start;
            const duration = 2000;
            let startTime = null;

            function smoothScroll(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const next = easeInOutQuad(timeElapsed, start, change, duration);
                window.scrollTo(0, next);
                if (timeElapsed < duration) requestAnimationFrame(smoothScroll);
            }

            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(smoothScroll);
        }
    }
};
</script>
  
<style scoped>
.chat-window {
    display: flex;
    flex-direction: column;
}

.chat-window-container {
    margin-top: 275px;
    width: 100%;

    @media (min-width: 600px) {
        width: 75%;
        margin-left: auto;
        margin-right: auto;
    }

    @media (min-width: 1000px) {
        width: 50%;
        margin-left: auto;
        margin-right: auto;
    }
}

.go-bottom {
    position: fixed;
    z-index: 500;
    background-color: #6352ab;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
    border: 2px solid white;
}

/* Animations */
.chat-line-animation-enter-active,
.chat-line-animation-leave-active {
    transition: opacity 0.5s, transform 0.5s;
}

.chat-line-animation-enter,
.chat-line-animation-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>
  