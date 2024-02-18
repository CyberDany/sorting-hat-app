<template>
  <v-app>

    <div class="top-bar-container">
      <div dense class="custom-bar">
        <div class="logo-container">
          <img :src="require('@/assets/logo-alt.png')" alt="Logo" class="logo">
        </div>
        <div class="border-gradient"></div>
      </div>

      <house-scores :scores="housePoints">
      </house-scores>
    </div>

    <chat-view :questions="questions" @points-earned="handlePointsEarned">
    </chat-view>

    <loading-screen :isLoading="loadingState">
    </loading-screen>

    <result-screen :isLoading="resultState" :image="houseWithHighestScoreImage">
    </result-screen>

  </v-app>
</template>

<script>


import questions from '@/assets/questions.json';
import HouseScores from './components/HouseScores';
import ChatView from './components/ChatView'
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen'

export default {
  name: 'App',

  components: {
    HouseScores,
    ChatView,
    LoadingScreen,
    ResultScreen
  },

  data: () => ({
    housePoints: [
      { code: 'g', name: 'Gryffindor', score: 0, color: '#b5463d', logo: require('@/assets/Gryffindor.svg'), image: require('@/assets/g-result.jpg') },
      { code: 'r', name: 'Ravenclaw', score: 0, color: '#23539a', logo: require('@/assets/Ravenclaw.svg'), image: require('@/assets/r-result.jpg') },
      { code: 'h', name: 'Hufflepuff', score: 0, color: '#dc9e3a', logo: require('@/assets/Hufflepuff.svg'), image: require('@/assets/h-result.jpg') },
      { code: 's', name: 'Slytherin', score: 0, color: '#075b4d', logo: require('@/assets/Slytherin.svg'), image: require('@/assets/s-result.jpg') },
    ],
    loadingState: true,
    questions: questions,
  }),

  computed: {
    resultState() {
      return this.$store.state.resultState;
    },
    houseWithHighestScoreImage() {
      if (!this.resultState) return '';

      const houseWithHighestScore = this.housePoints.reduce((max, house) => max.score > house.score ? max : house);

      return houseWithHighestScore.image;
    }
  },

  methods: {
    handlePointsEarned(points) {
      this.housePoints.forEach(house => {
        const scoreToAdd = points[house.code];

        if (scoreToAdd !== undefined) {
          house.score += scoreToAdd;
        }
      });
    },
    getHouseWithMostPoints() {
      if (this.housePoints.length === 0) return null; // Retorna null si housePoints está vacío

      return this.housePoints.reduce((max, house) => max.score > house.score ? max : house);
    },
  },

  mounted() {
    setTimeout(() => {
      this.loadingState = false;
      this.$store.commit("SET_INITIAL_STATE", true);
    }, 4000);
  }
};
</script>


<style>
.border-gradient {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(to left, rgba(255, 255, 255, 0), #746ac8, rgba(255, 255, 255, 0));
  top: 108px;
}

.logo-container {
  text-align: center;
}

.logo {
  max-height: 100px;
  margin-top: 4px;
  animation: pulseAnimation 3s infinite ease-in-out;
}

.top-bar-container {
  position: fixed;
  width: 100%;
  z-index: 100;
}

.custom-bar {
  height: 110px;
  background-color: #181220;
}

.v-application {
  background-color: #1b1630 !important;
}

@keyframes pulseAnimation {
  0% {
    transform: scale(1);
    /* Tamaño original */
  }

  50% {
    transform: scale(1.05);
    /* Un poco más grande */
  }

  100% {
    transform: scale(1);
    /* Vuelve al tamaño original */
  }
}
</style>