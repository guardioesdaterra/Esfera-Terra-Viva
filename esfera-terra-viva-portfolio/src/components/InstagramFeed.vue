<template>
  <section class="container instagram-section">
    <div class="section-header">
      <span class="mono">@esferaterraviva</span>
      <h2>Últimas Publicações</h2>
      <p class="insta-bio">{{ account.bio }}</p>
      <div class="insta-stats">
        <span>{{ account.followerCount }} seguidores</span>
        <span>{{ account.postCount }} publicações</span>
        <span>{{ account.category }}</span>
      </div>
    </div>

    <div class="posts-grid">
      <a
        v-for="(post, index) in visiblePosts"
        :key="index"
        class="post-card"
        :href="'https://www.instagram.com/p/' + post.code + '/'"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="post-thumb">
          <img
            :src="assetPath(post.thumb)"
            :alt="post.code"
            loading="lazy"
            @error="onImgError"
          />
          <div class="post-overlay">
            <div class="post-type-badge">
              <svg v-if="post.type === 'video'" viewBox="0 0 24 24" width="16" height="16" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
              <svg v-else-if="post.type === 'carousel'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
              <span v-else class="dot">&#9679;</span>
            </div>
            <div class="post-likes">&#9829; {{ post.likes }}</div>
          </div>
        </div>
      </a>
    </div>

    <div class="load-more" v-if="visibleCount < posts.length">
      <button class="btn-organic" @click="loadMore">Carregar mais</button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { postsData, accountInfo } from '../data/posts.js'

function assetPath(path) {
  const base = import.meta.env.BASE_URL
  const clean = path.startsWith('/') ? path.slice(1) : path
  return base + clean
}

const posts = ref(postsData)
const account = ref(accountInfo)
const visibleCount = ref(12)

const visiblePosts = computed(() => posts.value.slice(0, visibleCount.value))

const loadMore = () => {
  visibleCount.value += 12
}

const onImgError = (e) => {
  e.target.style.display = 'none'
}
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 3rem;
  margin-top: 0.5rem;
}

.insta-bio {
  max-width: 600px;
  margin: 1.5rem auto;
  color: var(--moss-haze);
  font-style: italic;
  font-size: 0.95rem;
  line-height: 1.6;
}

.insta-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  font-size: 0.8rem;
  color: var(--terracotta);
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.post-card {
  display: block;
  text-decoration: none;
  border-radius: 16px;
  overflow: hidden;
  transition: var(--transition-soft);
  border: 1px solid rgba(74, 55, 40, 0.05);
  background: var(--sand-paper);
}

.post-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(74, 55, 40, 0.12);
}

.post-thumb {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--sand-paper);
}

.post-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  display: block;
}

.post-card:hover .post-thumb img {
  transform: scale(1.05);
}

.post-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%);
  opacity: 0;
  transition: var(--transition-soft);
}

.post-card:hover .post-overlay {
  opacity: 1;
}

.post-type-badge {
  align-self: flex-end;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot {
  color: white;
  font-size: 0.6rem;
}

.post-likes {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.85rem;
  color: white;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

.load-more {
  text-align: center;
  margin-top: 3rem;
}

@media (max-width: 1100px) {
  .posts-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 800px) {
  .posts-grid { grid-template-columns: repeat(2, 1fr); }
  .section-header h2 { font-size: 2rem; }
}

@media (max-width: 500px) {
  .posts-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
}
</style>
