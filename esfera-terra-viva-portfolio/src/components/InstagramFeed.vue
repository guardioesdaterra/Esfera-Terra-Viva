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

    <div class="posts-grid" ref="gridRef">
      <div
        v-for="(post, index) in visiblePosts"
        :key="index"
        class="post-card"
      >
        <div class="post-media" :class="'post-type-' + post.type">
          <div class="post-type-badge">
            <span v-if="post.type === 'video'">&#9654;</span>
            <span v-else-if="post.type === 'carousel'">&#9638;</span>
            <span v-else>&#9679;</span>
          </div>
          <div class="post-media-fallback">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="fallback-icon">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
          <img
            :src="getMediaPath(post)"
            :alt="post.caption?.substring(0, 60)"
            loading="lazy"
            @error="onImgError"
          />
        </div>
        <div class="post-body">
          <p class="post-caption">{{ truncateCaption(post.caption) }}</p>
          <div class="post-meta">
            <span class="post-likes">&#9829; {{ post.likes }}</span>
            <span class="post-date">{{ formatDate(post.takenAt) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="load-more" v-if="visibleCount < posts.length">
      <button class="btn-organic" @click="loadMore">Carregar mais publicações</button>
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
const visibleCount = ref(8)

const visiblePosts = computed(() => posts.value.slice(0, visibleCount.value))

const loadMore = () => {
  visibleCount.value += 8
}

const truncateCaption = (caption) => {
  if (!caption) return ''
  return caption.length > 120 ? caption.substring(0, 120) + '...' : caption
}

const formatDate = (timestamp) => {
  const d = new Date(timestamp)
  return d.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' })
}

const getMediaPath = (post) => {
  const filename = post.file || ''
  return assetPath('2026-07-04_09-46-10/' + filename)
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
  background: var(--white-bleached);
  border-radius: 16px;
  overflow: hidden;
  transition: var(--transition-soft);
  border: 1px solid rgba(74, 55, 40, 0.05);
}

.post-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(74, 55, 40, 0.08);
}

.post-media {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--sand-paper);
}

.post-media-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.15;
  color: var(--moss-haze);
}

.fallback-icon {
  width: 48px;
  height: 48px;
}

.post-media img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.post-card:hover .post-media img {
  transform: scale(1.05);
}

.post-type-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(0,0,0,0.5);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  z-index: 2;
  backdrop-filter: blur(4px);
}

.post-body {
  padding: 1rem;
}

.post-caption {
  font-size: 0.8rem;
  color: var(--ink);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
  font-size: 0.7rem;
  color: var(--moss-haze);
  font-family: 'JetBrains Mono', monospace;
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
  .posts-grid { grid-template-columns: 1fr; }
}
</style>
