<template>
  <section class="container instagram-section">
    <div class="reveal">
      <span class="mono">@esferaterraviva</span>
      <h2>Últimas Publicações</h2>
      <p class="insta-bio">{{ account.bio }}</p>
      <div class="insta-stats">
        <div class="insta-stat">
          <span class="insta-stat-num">{{ account.followerCount }}</span>
          <span class="insta-stat-label">seguidores</span>
        </div>
        <div class="insta-stat">
          <span class="insta-stat-num">{{ account.postCount }}</span>
          <span class="insta-stat-label">publicações</span>
        </div>
        <div class="insta-stat">
          <span class="insta-stat-num">{{ account.category }}</span>
          <span class="insta-stat-label">categoria</span>
        </div>
      </div>
    </div>

    <div class="posts-grid">
      <div
        v-for="(post, index) in visiblePosts"
        :key="index"
        class="post-card"
        @click="openLightbox(index)"
      >
        <div class="post-thumb">
          <img
            :src="assetPath(post.thumb)"
            :alt="'Post ' + post.code"
            :loading="index < 4 ? 'eager' : 'lazy'"
            @error="onImgError"
          />
          <div class="post-overlay">
            <div class="post-type-badge">
              <svg v-if="post.type === 'video'" viewBox="0 0 24 24" width="14" height="14" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
              <svg v-else-if="post.type === 'carousel'" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
              <span v-else class="dot">&bull;</span>
            </div>
            <div class="post-likes">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              {{ post.likes }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="load-more reveal" v-if="visibleCount < posts.length">
      <button class="btn-organic" @click="loadMore">
        <span>Carregar mais</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
      </button>
    </div>

    <Teleport to="body">
      <div class="lightbox" :class="{ active: lightboxIndex !== null }" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <button class="lightbox-nav lightbox-prev" @click="prevLightbox" v-if="lightboxIndex !== null && posts.length > 1">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div class="lightbox-content" v-if="lightboxIndex !== null">
          <img :src="assetPath(posts[lightboxIndex].thumb)" :alt="'Post ' + posts[lightboxIndex].code" />
          <div class="lightbox-info">
            <div class="lightbox-likes">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              {{ posts[lightboxIndex].likes }}
            </div>
            <p>{{ posts[lightboxIndex].caption }}</p>
            <a :href="'https://www.instagram.com/p/' + posts[lightboxIndex].code + '/'" target="_blank" class="lightbox-link">Ver no Instagram</a>
          </div>
        </div>
        <button class="lightbox-nav lightbox-next" @click="nextLightbox" v-if="lightboxIndex !== null && posts.length > 1">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { postsData, accountInfo } from '../data/posts.js'
import { assetPath } from '../utils/paths.js'

const posts = ref(postsData)
const account = ref(accountInfo)
const visibleCount = ref(12)
const lightboxIndex = ref(null)

const visiblePosts = computed(() => posts.value.slice(0, visibleCount.value))

const loadMore = () => { visibleCount.value += 12 }

const onImgError = (e) => { e.target.style.display = 'none' }

const openLightbox = (index) => { lightboxIndex.value = index; document.body.style.overflow = 'hidden' }
const closeLightbox = () => { lightboxIndex.value = null; document.body.style.overflow = '' }
const nextLightbox = () => { if (lightboxIndex.value < posts.value.length - 1) lightboxIndex.value++; else lightboxIndex.value = 0 }
const prevLightbox = () => { if (lightboxIndex.value > 0) lightboxIndex.value--; else lightboxIndex.value = posts.value.length - 1 }

watch(lightboxIndex, (val) => {
  if (val !== null) {
    document.addEventListener('keydown', onKey)
  } else {
    document.removeEventListener('keydown', onKey)
  }
})

const onKey = (e) => {
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextLightbox()
  if (e.key === 'ArrowLeft') prevLightbox()
}
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
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
  gap: 2.5rem;
  margin-top: 1.5rem;
}

.insta-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.insta-stat-num {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--terracotta);
}

.insta-stat-label {
  font-size: 0.6rem;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: var(--moss-haze);
  margin-top: 0.25rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.post-card {
  display: block;
  text-decoration: none;
  border-radius: var(--radius-sm);
  overflow: hidden;
  transition: var(--transition-soft);
  cursor: pointer;
  position: relative;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.post-thumb {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--sand-dark);
}

.post-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease, filter 0.6s ease;
  display: block;
  filter: saturate(0.82) sepia(0.12) contrast(1.04) brightness(0.97);
}

.post-card:hover .post-thumb img {
  transform: scale(1.08);
  filter: saturate(0.9) sepia(0.08) contrast(1.06) brightness(0.98);
}

.post-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75rem;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
  opacity: 0;
  transition: var(--transition-fast);
}

.post-card:hover .post-overlay {
  opacity: 1;
}

.post-type-badge {
  align-self: flex-end;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot { color: white; font-size: 1rem; line-height: 1; }

.post-likes {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8rem;
  color: white;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

.load-more {
  text-align: center;
  margin-top: 3rem;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.lightbox.active {
  opacity: 1;
  pointer-events: auto;
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(4px);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
  z-index: 2;
}

.lightbox-close:hover {
  background: rgba(255,255,255,0.2);
  transform: scale(1.1);
}

.lightbox-content {
  display: flex;
  gap: 2rem;
  max-width: 900px;
  max-height: 85vh;
  align-items: center;
  padding: 2rem;
}

.lightbox-content img {
  max-width: 500px;
  max-height: 70vh;
  border-radius: var(--radius-sm);
  object-fit: contain;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.lightbox-info {
  max-width: 300px;
  color: white;
}

.lightbox-likes {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.lightbox-info p {
  font-size: 0.85rem;
  line-height: 1.7;
  opacity: 0.85;
  margin-bottom: 1rem;
}

.lightbox-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--ochre-sun);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  transition: var(--transition-fast);
}

.lightbox-link:hover {
  color: var(--ochre-sun-light);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(4px);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
  z-index: 2;
}

.lightbox-nav:hover { background: rgba(255,255,255,0.2); transform: translateY(-50%) scale(1.1); }
.lightbox-prev { left: 1.5rem; }
.lightbox-next { right: 1.5rem; }

@media (max-width: 1100px) {
  .posts-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 800px) {
  .posts-grid { grid-template-columns: repeat(2, 1fr); }
  .lightbox-content { flex-direction: column; padding: 1rem; }
  .lightbox-content img { max-width: 100%; max-height: 50vh; }
  .lightbox-info { max-width: 100%; }
  .lightbox-prev { left: 0.5rem; }
  .lightbox-next { right: 0.5rem; }
}

@media (max-width: 500px) {
  .posts-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
}
</style>
