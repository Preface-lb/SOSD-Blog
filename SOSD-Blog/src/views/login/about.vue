<template>
  <div class="lab-container">
    <div class="logo-section fade-in-down">
      <a href="/" class="inline-block">
        <img class="logo-png" src="../../assets/logotext.png" alt="Logo" />
      </a>
    </div>
    <div class="title">
      <h1>关于我们</h1>
    </div>
    <div class="lab-content">
      <!-- Teams Row -->
      <div class="teams-row">
        <!-- Web Team -->
        <div class="team-card">
          <div class="team-image">
            <img src="../../assets/about/group1.png" alt="Web组" />
          </div>
          <h3>Web组</h3>
          <div class="team-content">
            <p>
              主要负责Web应用开发，包括前端开发、服务器搭建、CI/CD等，目前主要参与SOGO官网、福州大学教务与教职信息平台和实验室其他外包项目的开发和迭代维护。
            </p>
            <p>
              前端成员主要使用Vue3框架进行开发，后端成员以Java为主要开发语言，使用SpringBoot框架开发。
            </p>
            <p>
              Web组织积参与开源社区活动，将专业知识融入开源项目，鼓励团队成员参与开源活动，分享研究成果，培养创新思维。
            </p>
          </div>
        </div>

        <!-- Mobile Team -->
        <div class="team-card">
          <div class="team-image">
            <img src="../../assets/about/group2.png" alt="移动组" />
          </div>
          <h3>移动组</h3>
          <div class="team-content">
            <p>
              主要分为跨平台开发、Android开发、iOS开发、HarmonyOS开发方向。目前主要参与完成了福大校友通、福大教务课专社会服务性项目及创新项目的开发工作。
            </p>
            <p>
              成员主要学习3Dart、Kotlin、Swift、ArkTS、Flutter、Flet等语言及开发框架，掌握移动应用开发技巧。
            </p>
          </div>
        </div>

        <!-- Design Team -->
        <div class="team-card">
          <div class="team-image">
            <img src="../../assets/about/group3.png" alt="设计组" />
          </div>
          <h3>设计组</h3>
          <div class="team-content">
            <p>
              主要分为UI设计、视觉前瞻、视觉品牌、评测等方向，设计组近年来在国际用户体验创新大赛、移动应用创新赛等比赛中取得了多项瞩目的成绩。
            </p>
            <p>
              成员主要学习平面设计、UI/UX设计、产品设计、数据开发等知识，掌握PS、AI、ID、AE、XD、Figma、Axure等软件。
            </p>
          </div>
        </div>

        <!-- AI-NLP Team -->
        <div class="team-card">
          <div class="team-image">
            <img src="../../assets/about/group4.png" alt="AI-NLP组" />
          </div>
          <h3>AI-NLP组</h3>
          <div class="team-content">
            <p>
              主要专注于自然语言处理（NLP）和人工智能算法的研究与应用开发。涉及语义文摘、文本生成、情感分析、机器翻译、对话系统、信息抽取等多个方向。
            </p>
            <p>
              成员主要学习深度学习、机器学习、计算机科学等相关知识，熟练掌握Python、TensorFlow等工具和框架。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lab-container {
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
  color: #f8f9fa;
}

/* Logo 图标 */
.logo-section {
  position: absolute;
  top: 30px;
  left: 50px;
  z-index: 10;
}

.logo-png {
  height: 80px;
  object-fit: contain;
}

.title {
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
}

.title h1 {
  font-size: 3.5rem;
  font-weight: 700;
  color: #050668;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.lab-content {
  max-width: 1650px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.teams-row {
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  overflow-x: auto;
}

.team-card {
  flex: 1;
  min-width: 280px;
  background: linear-gradient(135deg, #0d2b5e, #1a4b8c);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #0f3370, #1e56a0);
}

.team-image {
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.team-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.team-card:hover .team-image img {
  transform: scale(1.05);
}

.team-card h3 {
  color: #7dd3fc;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.team-content {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 300px;
}

.team-content p {
  color: #e2e8f0;
  line-height: 1.6;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  font-weight: 400;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Scrollbar Styling */
.team-content::-webkit-scrollbar {
  width: 4px;
}

.team-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.team-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.team-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

@media (max-width: 1200px) {
  .teams-row {
    flex-wrap: wrap;
  }

  .team-card {
    flex: 1 1 calc(50% - 1.5rem);
  }
}

@media (max-width: 768px) {
  .team-card {
    flex: 1 1 100%;
  }

  .lab-content {
    padding: 1rem;
  }

  .logo-section {
    top: 15px;
    left: 15px;
  }

  .logo-png {
    height: 80px;
  }
}
</style>
