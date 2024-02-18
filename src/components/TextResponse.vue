<template>
    <div class="input-wrapper">
        <input type="text" v-model="name" placeholder="Type your name" @keyup.enter="sendMessage" />
        <div class="send-icon" @click="sendMessage">
            <svg viewBox="0 0 24 24" class="icon-send" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            name: ''
        };
    },
    methods: {
        sendMessage() {
            this.$emit('name-typed', this.name);
        }
    }
}
</script>
  
<style scoped>
.input-wrapper {
    display: flex;
    align-items: center;
    border: 2px solid #ccc;
    border-radius: 4px;
    width: 60%;
    margin-left: 4px;
    margin-top: 4px;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    animation: fadeInAnimation 1s ease-in-out forwards;
    animation-delay: 2s;
}

@keyframes fadeInAnimation {
    to {
        opacity: 1;
    }
}

.input-wrapper input {
    flex-grow: 1;
    border: none;
    padding: 10px;
    font-size: 16px;
    color: white;
    background-color: transparent;
    caret-color: white;
    min-width: 10px;
}

.input-wrapper input:focus {
    outline: none;
    box-shadow: none;
    border-color: transparent;
}

.input-wrapper input::placeholder {
    color: white;
    opacity: 1;
}

.input-wrapper input:-ms-input-placeholder {
    color: white;
}

.input-wrapper input::-ms-input-placeholder {
    color: white;
}

.input-wrapper .send-icon {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.input-wrapper .send-icon:hover {
    background-color: #40366e;
}

.icon-send {
    fill: white;
    width: 24px;
    height: 24px;
}
</style>