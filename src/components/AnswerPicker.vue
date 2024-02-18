<template>
    <div v-if="question" class="question-selector">
        <div>
            <transition-group name="right-transition">
                <div class="button" v-for="answer in question.answers" :key="answer.title" @click="selectAnswer(answer)">
                    {{ answer.title }}
                </div>
            </transition-group>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        question: Object
    },
    methods: {
        selectAnswer(answer) {
            this.$emit('answer-selected', answer);
        }
    },
};
</script>
  
<style scoped>
.question-selector {
    margin-top: 15px;
}

.button {
    background-color: #40366e;
    cursor: pointer;
    margin: 4px;
    padding: 5px;
    border-radius: 8px;
    text-align: center;
    color: white;
    border: 2px solid #433970a4;
}

.button:hover {
    box-shadow: inset 0 0 0 2px white;
}

/* Animations */
.right-transition-enter-active {
    transition: opacity 0.5s ease;
}

.right-transition-leave-active {
    transition: opacity 0.5s ease;
}

.right-transition-enter,
.right-transition-leave-to {
    opacity: 0;
}
</style>
  