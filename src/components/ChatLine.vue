<template>
    <transition :name="isUser ? 'left-transition' : 'right-transition'" appear>
        <div :class="['chat-line', { 'user-line': isUser, 'bot-line': !isUser }]">
            {{ text }}
        </div>
    </transition>
</template>
  
<script>
export default {
    props: {
        text: String,
        isUser: Boolean
    },
};
</script>
  
<style scoped>
.chat-line {
    margin: 5px;
    padding: 10px;
    width: fit-content;
    max-width: 60%;
    transition: all 0.5s;
}

.user-line {
    background-color: #e0e0e0;
    align-self: flex-end;
    border-radius: 20px 20px 0px 20px;
    border: 3px solid #9589ca;
    color: #40366e;
}

.bot-line {
    background-color: #40366e;
    align-self: flex-start;
    border-radius: 20px 20px 20px 0px;
    border: 2px solid white;
    color: white;
}

/* Animations */
.right-transition-enter-active,
.right-transition-leave-active {
    transition: opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s;
}

.right-transition-enter,
.right-transition-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}


.left-transition-enter-active,
.left-transition-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.left-transition-enter {
    opacity: 0;
    transform: translateX(100%);
}

.left-transition-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>
  