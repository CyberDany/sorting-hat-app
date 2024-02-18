<template>
    <transition name="fade">
        <div class="result-overlay" v-if="isLoading">
            <div class="result-image-wrapper">
                <img :src="image" alt="Cargando..." class="result-image" draggable="false">
            </div>
            <button @click="restartQuiz" class="restart-button">Restart Quiz</button>
        </div>
    </transition>
</template>
  
<script>
export default {
    props: {
        isLoading: Boolean,
        image: String
    },

    methods: {
        restartQuiz() {
            window.location.reload();
        }
    }
}
</script>
  
<style scoped>
.result-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #060b1bf2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.result-image-wrapper {
    position: relative;
    width: 100%;
}

.result-image-wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle, transparent, #060b1b 99%);
    pointer-events: none;
}

.result-image {
    width: 100%;
    display: block;

}

.restart-button {
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
    background-color: #6352ab;
    border-radius: 8px;
    border: 2px solid white;
    font-weight: 600;
}

.restart-button:hover {
    background-color: #40366e;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
  