<template>
    <div class="house-scores">
        <div v-for="house in houses" :key="house.name" class="house-flag"
            :style="{ height: houseHeight(house.percentage) + 'px', backgroundColor: house.color }">
            <img :src="house.logo" alt="Logo" class="house-logo">
            <span class="house-name">{{ house.name }}</span>
            <span class="house-score">{{ house.score }}</span>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'HouseScores',
    data: () => ({
    }),

    props: {
        scores: {
            type: Array,
            required: true
        }
    },

    computed: {
        houses() {
            const totalScore = this.scores.reduce((acc, h) => acc + h.score, 0);
            return this.scores.map(house => ({
                ...house,
                percentage: totalScore > 0 ? (house.score * 100) / totalScore : 0
            }));
        }
    },

    methods: {
        houseHeight(score) {
            const minHeight = 80;
            const maxHeight = 150;
            const heightDiff = maxHeight - minHeight;
            const houseDiff = (score * heightDiff) / 100;

            if (score == 0) {
                return minHeight;
            }
            return houseDiff + minHeight;
        }
    },

    created() {

    },
};
</script>
  
<style scoped>
.house-scores {
    display: flex;
    justify-content: center;
    background-color: #1b1630;
    height: 150px;
    background-image:
        linear-gradient(to bottom, rgba(27, 22, 48, 0) 0%, rgba(27, 22, 48, 1) 100%),
        url('~@/assets/night.jpg');
    background-size: cover;
}

.house-flag {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%), #fff;
    margin: 0px 8px;
    transition: height 0.6s ease 0.3s;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    position: relative;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), 50% 100%, 0 calc(100% - 20px));
    width: 65px;
}

.house-name {
    position: absolute;
    bottom: -20px;
    font-weight: bold;
    color: #dbd7d7;
}

.house-score {
    position: absolute;
    justify-content: center;
    top: 0px;
    font-size: 0.8em;
    color: #dbd7d7;
    font-weight: 700
}

.house-logo {
    max-height: 55px;
    margin: 0 auto;
    bottom: 7px;
    position: absolute;
}
</style>
  