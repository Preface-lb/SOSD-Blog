<template>
  <div class="cover-container">
    <div class="animated-background" :style="{ backgroundImage: `url(${bgImage})` }"></div>
    <div class="logo fade-in">
      <img class="logo-png" src="../assets/logotext.png" alt="Logo" />
    </div>

    <div class="content-wrapper">
      <div class="titles">
        <h1 class="main-title slide-in">服务外包与软件设计实验室</h1>
        <h2 class="sub-title slide-in-delayed">官方知识分享博客</h2>
      </div>

      <div class="buttons-container">
        <router-link
          custom
          v-slot="{ navigate }"
          to="/login"
          @mouseover="hoverButton(0)"
          @mouseleave="resetButton(0)"
        >
          <button
            class="action-button fade-in-up"
            :class="{ 'button-hovered': hoveredButton === 0 }"
            @click="navigate"
          >
            <div class="icon-circle">
              <span class="check-icon">✓</span>
            </div>
            <span class="button-text">登录博客 Login</span>
          </button>
        </router-link>

        <router-link
          custom
          v-slot="{ navigate }"
          to="/register"
          @mouseover="hoverButton(1)"
          @mouseleave="resetButton(1)"
        >
          <button
            class="action-button fade-in-up"
            :class="{ 'button-hovered': hoveredButton === 1 }"
            @click="navigate"
          >
            <div class="icon-circle">
              <span class="check-icon">✓</span>
            </div>
            <span class="button-text">立即注册 Register</span>
          </button>
        </router-link>

        <router-link
          custom
          v-slot="{ navigate }"
          to="/about"
          @mouseover="hoverButton(2)"
          @mouseleave="resetButton(2)"
        >
          <button
            class="action-button fade-in-up"
            :class="{ 'button-hovered': hoveredButton === 2 }"
            @click="navigate"
          >
            <div class="icon-circle">
              <span class="check-icon">✓</span>
            </div>
            <span class="button-text">了解我们 About</span>
          </button>
        </router-link>
      </div>
    </div>
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'CoverComponent',
  data() {
    return {
      bgImage: 'src/assets/home-bg.png',
      hoveredButton: null,
    }
  },
  methods: {
    hoverButton(index) {
      this.hoveredButton = index
    },
    resetButton() {
      this.hoveredButton = null
    },
  },
  mounted() {
    document.addEventListener('mousemove', this.handleMouseMove)
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove)
  },
  methods: {
    handleMouseMove(event) {
      const moveX = (event.clientX / window.innerWidth) * 10
      const moveY = (event.clientY / window.innerHeight) * 10

      document.querySelector('.animated-background').style.transform =
        `translate(${-moveX}px, ${-moveY}px) scale(1.1)`
    },
    hoverButton(index) {
      this.hoveredButton = index
    },
    resetButton() {
      this.hoveredButton = null
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');

.cover-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans SC', sans-serif;
}

.animated-background {
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  animation: backgroundMove 30s ease-in-out infinite alternate;
  transition: transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
  will-change: transform;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  z-index: -1;
}

.content-wrapper {
  max-width: 1500px;
  min-height: 700px;
  width: 100%;
  margin-top: 0rem;
  padding: 1rem 6rem;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.logo {
  margin-bottom: 4rem;
  margin-top: 5px;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: translateY(-5px);
}

.logo-png {
  max-width: 380px;
  height: auto;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.titles {
  margin-bottom: 4rem;
}

.main-title {
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #000;
  letter-spacing: -0.5px;
  line-height: 1.2;
  position: relative;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 320px;
  height: 4px;
  background: linear-gradient(90deg, #4040c8, #6060ff);
  border-radius: 2px;
}

.sub-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #021543;
  opacity: 0.9;
}

.buttons-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.action-button {
  display: flex;
  align-items: center;
  padding: 0.9rem 2rem;
  border-radius: 2.5rem;
  border: 2px solid #4040c8;
  background-color: rgba(255, 255, 255, 0.8);
  color: #4040c8;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.action-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(64, 64, 200, 0.1), transparent);
  transition: left 0.5s ease;
}

.action-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(64, 64, 200, 0.2);
  background-color: #4040c8;
  color: white;
  border-color: #4040c8;
}

.action-button:hover::before {
  left: 100%;
}

.button-hovered {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(64, 64, 200, 0.2);
  background-color: #4040c8;
  color: white;
}

.icon-circle {
  width: 1.8rem;
  height: 1.8rem;
  background-color: #4040c8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.action-button:hover .icon-circle {
  background-color: white;
}

.action-button:hover .check-icon {
  color: #4040c8;
}

.check-icon {
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
}

.button-text {
  position: relative;
  z-index: 1;
}

/* Animations */
@keyframes backgroundMove {
  0% {
    transform: translate(3%, 3%) scale(1.1);
  }
  100% {
    transform: translate(-3%, -3%) scale(1.1);
  }
}

.fade-in {
  animation: fadeIn 1s ease forwards;
}

.slide-in {
  opacity: 0;
  transform: translateX(-30px);
  animation: slideIn 0.8s ease 0.2s forwards;
}

.slide-in-delayed {
  opacity: 0;
  transform: translateX(-30px);
  animation: slideIn 0.8s ease 0.4s forwards;
}

.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

.fade-in-up:nth-child(1) {
  animation-delay: 0.6s;
}

.fade-in-up:nth-child(2) {
  animation-delay: 0.8s;
}

.fade-in-up:nth-child(3) {
  animation-delay: 1s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive styles */
@media (max-width: 1200px) {
  .content-wrapper {
    padding: 3rem 4rem;
  }

  .main-title {
    font-size: 3rem;
  }

  .sub-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 2.5rem;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .sub-title {
    font-size: 1.8rem;
  }

  .buttons-container {
    gap: 1rem;
  }

  .action-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .content-wrapper {
    padding: 2rem 1.5rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .sub-title {
    font-size: 1.5rem;
  }

  .buttons-container {
    flex-direction: column;
    width: 100%;
  }

  .action-button {
    width: 100%;
    justify-content: center;
  }

  .logo-png {
    max-width: 220px;
  }
}
</style>
