<template>
  <div class="loading-overlay" v-show="isLoading">
    <div class="loading-image-wrapper">
      <img src="@/assets/sorting-hat.gif" alt="Cargando..." class="loading-image">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: Boolean
  }
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #060b1b;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-image-wrapper {
  position: relative;
  width: 50%;
}

.loading-image-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, transparent, #060b1b 95%);
  pointer-events: none;
}

.loading-image {
  width: 100%;
  display: block;
}
</style>
