<template>
  <div class="register-container">
    <div class="background-overlay"></div>

    <div class="logo-section fade-in-down">
      <img class="logo-png" src="../../assets/logotext.png" alt="Logo" />
    </div>

    <div class="main-content">
      <div class="title-section fade-in-left">
        <h1 class="title">
          <span class="title-highlight">服务外包</span>与<span class="title-highlight"
            >软件设计</span
          ><br />
          官方知识博客<br />
          <span class="title-en"
            >Official Knowledge<br />
            Sharing Platform</span
          >
        </h1>
        <div class="title-decoration"></div>
      </div>

      <div class="content-section fade-in-right">
        <div class="animation-wrapper">
          <div class="lottie-animation">
            <Vue3Lottie
              width="900px"
              height="900px"
              :animation-data="animationData"
              :loop="true"
              :speed="0.8"
            />
          </div>
        </div>

        <div class="register-card-wrapper">
          <div class="register-card">
            <div class="card-header">
              <h1>创建账户<br />Create Account</h1>
            </div>

            <div class="form-container">
              <div class="form-group">
                <label>
                  <span class="label-text">用户名</span>
                  <div class="input-container">
                    <el-icon class="input-icon">
                      <User />
                    </el-icon>
                    <input type="text" placeholder="请输入用户名" v-model="username" />
                  </div>
                </label>
              </div>

              <div class="form-group">
                <label>
                  <span class="label-text">姓名</span>
                  <div class="input-container">
                    <el-icon class="input-icon">
                      <UserFilled />
                    </el-icon>
                    <input type="text" placeholder="请输入姓名" v-model="name" />
                  </div>
                </label>
              </div>
              <div class="form-group">
                <label>
                  <span class="label-text">密码</span>
                  <div class="input-container">
                    <el-icon class="input-icon">
                      <Lock />
                    </el-icon>
                    <input
                      :type="passwordVisible ? 'text' : 'password'"
                      placeholder="请输入密码"
                      v-model="password"
                    />
                    <span class="toggle-password" @click="togglePasswordVisibility">
                      <i :class="passwordVisible ? 'el-icon-view' : 'el-icon-view-close'"></i>
                    </span>
                  </div>
                </label>
              </div>
              <div class="form-group">
                <label>
                  <span class="label-text">邮箱</span>
                  <div class="input-container">
                    <el-icon class="input-icon">
                      <ChatDotSquare />
                    </el-icon>
                    <input type="email" placeholder="请输入邮箱" v-model="email" />
                    <button
                      class="get-code-btn"
                      :disabled="countdown > 0"
                      @click="sendVerificationCode"
                    >
                      {{ countdown > 0 ? `${countdown}s后重新获取` : '获取验证码' }}
                    </button>
                  </div>
                </label>
              </div>

              <div class="form-group">
                <label>
                  <span class="label-text">验证码</span>
                  <div class="input-container">
                    <el-icon class="input-icon">
                      <Key />
                    </el-icon>
                    <input type="text" placeholder="请输入验证码" v-model="verificationCode" />
                  </div>
                </label>
              </div>

              <button class="register-btn" @click="handleRegister">
                <span>REGISTER</span>
                <i class="el-icon-right"></i>
              </button>

              <div class="have-account">
                已有账号？<router-link to="/login">立即登录</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import animationJson from '../../assets/lottie/register.json'

export default {
  data() {
    return {
      animationData: animationJson,
      username: '',
      name: '',
      email: '',
      verificationCode: '',
      password: '',
      passwordVisible: false,
      countdown: 0,
      timer: null,
    }
  },
  mounted() {
    // Add staggered animation to decorative elements
    const decorElements = document.querySelectorAll('.decorative-elements > div')
    decorElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate')
      }, 100 * index)
    })
  },
  beforeDestroy() {
    // 清除计时器
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    // 切换密码可见性
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible
    },

    // 发送验证码
    sendVerificationCode() {
      // 邮箱格式验证
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
      if (!emailRegex.test(this.email)) {
        this.$message.error('请输入有效的邮箱地址')
        return
      }

      // 发送验证码逻辑
      console.log('发送验证码到邮箱:', this.email)

      // 倒计时
      this.countdown = 60
      this.timer = setInterval(() => {
        this.countdown--
        if (this.countdown <= 0) {
          clearInterval(this.timer)
        }
      }, 1000)

      // 模拟发送成功提示
      this.$message.success('验证码已发送，请查收邮箱')
    },

    // 处理注册
    handleRegister() {
      // 表单验证
      if (!this.username) {
        this.$message.error('请输入用户名')
        return
      }

      if (!this.name) {
        this.$message.error('请输入姓名')
        return
      }

      if (!this.email) {
        this.$message.error('请输入邮箱')
        return
      }

      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
      if (!emailRegex.test(this.email)) {
        this.$message.error('请输入有效的邮箱地址')
        return
      }

      if (!this.verificationCode) {
        this.$message.error('请输入验证码')
        return
      }

      if (!this.password) {
        this.$message.error('请输入密码')
        return
      }

      if (this.password.length < 6) {
        this.$message.error('密码长度至少为6位')
        return
      }

      // 注册逻辑
      console.log('注册信息:', {
        username: this.username,
        name: this.name,
        email: this.email,
        verificationCode: this.verificationCode,
        password: this.password,
      })

      // 模拟注册成功
      this.$message.success('注册成功，正在跳转...')

      // 延迟跳转
      setTimeout(() => {
        this.$router.push('/login')
      }, 1500)
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.register-container {
  width: 100%;
  min-height: 100vh;
  background: url(../../assets/login-bg.png) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', Arial, sans-serif;
  position: relative;
  overflow: hidden;
  color: #2b2d42;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  backdrop-filter: blur(1px);
  z-index: 1;
}

/* Logo 图标 */
.logo-section {
  position: absolute;
  top: 5px;
  left: 10px;
  z-index: 10;
}

.logo-png {
  height: 120px;
  object-fit: contain;
}

/* 主内容 */
.main-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}

/* 标题 */
.title-section {
  min-width: 680px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.title {
  color: #2b2d42;
  font-size: 3.8rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
  position: relative;
}

.title-highlight {
  position: relative;
  display: inline-block;
  color: #4361ee;
  z-index: 1;
}

.title-highlight::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: rgba(67, 97, 238, 0.2);
  z-index: -1;
}

.title-en {
  font-size: 3rem;
  margin-top: 10px;
  font-weight: 700;
  z-index: 100;
}

.title-decoration {
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, #4361ee, #f72585);
  border-radius: 2px;
}

/* Content section */
.content-section {
  display: flex;
  gap: 30px;
}

.animation-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.lottie-animation {
  width: 400px;
  height: 400px;
  position: relative;
  left: -260px;
  top: -260px;
}

/* Register card */
.register-card-wrapper {
  min-width: 480px;
}

.register-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 50px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.register-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.card-header {
  color: #2b2d42;
  font-size: 20px;
  font-weight: 800;
  color: #0f2171;
  text-align: center;
}

.form-container {
  margin-top: 35px;
}

.form-group {
  margin-bottom: 25px;
}

.label-text {
  display: block;
  font-size: 1rem;
  font-weight: 800;
  color: #3a56d4;
  margin-bottom: 10px;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.916);
  border: 1px solid rgba(6, 49, 122, 0.3);
  border-radius: 15px;
  transition: all 0.3s ease;
}

.input-container:focus-within {
  border-color: #4361ee;
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
}

.input-icon {
  padding-left: 5px;
  width: 30px;
  height: 30px;
  color: #1b0594;
  font-weight: bold;
}

.input-container input {
  flex: 1;
  padding: 12px 15px 12px 0;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  color: #2b2d42;
  outline: none;
}

.input-container input::placeholder {
  color: #8d99ae;
  opacity: 0.7;
}

.toggle-password {
  padding: 0 15px;
  cursor: pointer;
  color: #4577ce;
  transition: all 0.3s ease;
}

.toggle-password:hover {
  color: #4361ee;
}

.get-code-btn {
  position: absolute;
  right: 10px;
  background-color: #4361ee;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.get-code-btn:hover:not(:disabled) {
  background-color: #3a56d4;
}

.get-code-btn:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.register-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, #4361ee, #3a56d4);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
  position: relative;
  overflow: hidden;
}

.register-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(67, 97, 238, 0.4);
}

.register-btn i {
  transition: transform 0.3s ease;
}

.register-btn:hover i {
  transform: translateX(3px);
}

.have-account {
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #4361ee;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.have-account a {
  color: #4361ee;
  text-decoration: none;
  font-weight: 600;
  margin-left: 5px;
}

.have-account a:hover {
  text-decoration: underline;
}

/* Animations */
.fade-in-down {
  animation: fadeInDown 0.8s ease forwards;
}

.fade-in-left {
  animation: fadeInLeft 0.8s ease forwards;
  margin-left: -70px;
}

.fade-in-right {
  animation: fadeInRight 0.8s ease forwards;
  background-color: rgba(141, 153, 174, 0.55);
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
  width: 120%;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive design */
@media (max-width: 1200px) {
  .main-content {
    flex-direction: column;
    align-items: center;
    padding: 80px 20px 40px;
  }

  .title-section {
    text-align: center;
    margin-bottom: 40px;
  }

  .title-decoration {
    left: 50%;
    transform: translateX(-50%);
  }

  .content-section {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .logo-section {
    top: 20px;
    left: 20px;
  }

  .title {
    font-size: 2.2rem;
  }

  .title-en {
    font-size: 2.4rem;
  }

  .animation-wrapper {
    display: none;
  }

  .register-card {
    padding: 25px;
  }
}

@media (max-width: 480px) {
  .register-card {
    padding: 20px 15px;
  }
}
</style>
