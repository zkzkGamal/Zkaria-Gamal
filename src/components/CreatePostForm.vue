<template>
    <div class="create-post-container">
        <router-link class="back-link" to="/posts">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Posts
        </router-link>
        
        <div class="form-card">
            <h2 class="form-title">Create New Post</h2>
            <form @submit.prevent="CreatePost" class="post-form">
                <div class="form-group">
                    <label>Title</label>
                    <input class="form-input" type="text" v-model="title" placeholder="Enter post title" required>
                </div>
                
                <div class="form-group">
                    <label>Subtitle</label>
                    <input class="form-input" type="text" v-model="sub_headline" placeholder="Enter post subtitle">
                </div>
                
                <div class="form-group">
                    <label>Content</label>
                    <textarea class="form-textarea" v-model="body" maxlength="5000" placeholder="Write your post content here..." required></textarea>
                </div>
                
                <div class="form-group">
                    <label>Thumbnail</label>
                    <div class="file-upload-wrapper">
                        <input type="file" id="thumbnail" class="file-input" accept="image/*" @change="handleFileChange">
                        <label for="thumbnail" class="file-label">
                            <span v-if="!thumbnail">Choose Image</span>
                            <span v-else>{{ thumbnail.name }}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        </label>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="toggle-group">
                        <label class="toggle-label">
                            <input type="checkbox" v-model="active">
                            <span class="toggle-slider"></span>
                            Active
                        </label>
                        <label class="toggle-label">
                            <input type="checkbox" v-model="featured">
                            <span class="toggle-slider"></span>
                            Featured
                        </label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Tags</label>
                    <select multiple v-model="SelectedTags" class="form-select">
                        <option v-for="tag in tags" :key="tag.id" :value="tag.id">{{tag.name}}</option>
                    </select>
                    <small class="helper-text">Hold Ctrl/Cmd to select multiple tags</small>
                </div>
                
                <button type="submit" class="submit-btn">
                    Submit Post
                    <span class="btn-ripple"></span>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name: 'CreatePostForm',
    data() {
        return {
            tags: [],
            title: '',
            sub_headline: '',
            body: '',
            thumbnail: null,
            active: false,
            featured: false,
            SelectedTags: [],
        }
    },
    computed: {
        ...mapState(['user', 'token']),
        csrfToken() {
            const cookieVal = document.cookie
                .split('; ')
                .find((row) => row.startsWith('csrftoken='));
            if (cookieVal) {
                return cookieVal.split('=')[1];
            }
            return '';
        },
    },
    mounted() {
        this.getTags()
    },
    methods: {
        getTags() {
            axios
                .get('https://zkzk.softzm.cloud/api/tags')
                .then((response) => {
                    this.tags = response.data
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        handleFileChange(event) {
            this.thumbnail = event.target.files[0];
        },
        CreatePost() {
            const headers = {
                Authorization: `Token ${this.token}`,
                'Content-type': 'multipart/form-data',
                'X-CSRFToken': this.csrfToken,
            }

            const formData = new FormData();
            formData.append('title', this.title);
            formData.append('sub_headline', this.sub_headline);
            formData.append('body', this.body);
            formData.append('active', this.active);
            formData.append('featured', this.featured);
            this.SelectedTags.forEach((id) => {
                formData.append('tags', id);
            });
            if (this.thumbnail) {
                formData.append('thumbnail', this.thumbnail);
            }

            axios
                .post('https://zkzk.softzm.cloud/api/posts', formData, { headers })
                .then(() => {
                    alert('Post created successfully')
                    this.$router.push('/posts');
                }).catch((error) => {
                    console.warn('Error creating post', error)
                    this.resetForm();
                })
        },
        resetForm() {
            this.title = ''
            this.sub_headline = ''
            this.body = ''
            this.SelectedTags = []
            this.thumbnail = null
            this.active = false
            this.featured = false
        }
    }
}
</script>

<style scoped>
.create-post-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted, #9ca3af);
    text-decoration: none;
    margin-bottom: 2rem;
    font-weight: 500;
    transition: color 0.2s;
}

.back-link:hover {
    color: var(--emerald-500, #10b981);
}

.form-card {
    background: var(--bg-card, #1f2937);
    border: 1px solid var(--border-color, #374151);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

.form-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--text-hero, #f3f4f6);
    margin-bottom: 2rem;
    text-align: center;
    background: linear-gradient(135deg, var(--text-hero, #fff), var(--emerald-500, #10b981));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.post-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary, #e5e7eb);
}

.form-input,
.form-textarea,
.form-select {
    background: var(--bg-alt, #111827);
    border: 1px solid var(--border-dim, #374151);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    color: var(--text-body, #d1d5db);
    font-size: 1rem;
    transition: all 0.3s;
    width: 100%;
}

.form-textarea {
    min-height: 200px;
    resize: vertical;
}

.form-select {
    min-height: 120px;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
    outline: none;
    border-color: var(--emerald-500, #10b981);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.file-input {
    display: none;
}

.file-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: var(--bg-alt, #111827);
    border: 1px dashed var(--border-dim, #374151);
    border-radius: 0.5rem;
    cursor: pointer;
    color: var(--text-muted, #9ca3af);
    transition: all 0.3s;
}

.file-label:hover {
    border-color: var(--emerald-500, #10b981);
    background: rgba(16, 185, 129, 0.05);
}

.form-row {
    display: flex;
    justify-content: space-between;
}

.toggle-group {
    display: flex;
    gap: 2rem;
}

.toggle-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    color: var(--text-primary, #e5e7eb);
    font-weight: 500;
}

.toggle-label input {
    display: none;
}

.toggle-slider {
    width: 48px;
    height: 24px;
    background: var(--bg-alt, #111827);
    border-radius: 9999px;
    position: relative;
    transition: background 0.3s;
    border: 1px solid var(--border-dim, #374151);
}

.toggle-slider::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    background: var(--text-muted, #9ca3af);
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: transform 0.3s, background 0.3s;
}

.toggle-label input:checked + .toggle-slider {
    background: rgba(16, 185, 129, 0.2);
    border-color: var(--emerald-500, #10b981);
}

.toggle-label input:checked + .toggle-slider::before {
    transform: translateX(24px);
    background: var(--emerald-500, #10b981);
}

.helper-text {
    font-size: 0.8rem;
    color: var(--text-muted, #6b7280);
    margin-top: 0.25rem;
}

.submit-btn {
    background: var(--emerald-500, #10b981);
    color: var(--obsidian-950, #000);
    border: none;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
    margin-top: 1rem;
}

.submit-btn:hover {
    background: var(--emerald-400, #34d399);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.submit-btn:active {
    transform: translateY(0);
}

.btn-ripple {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
    opacity: 0;
    transform: scale(0);
    transition: transform 0.6s, opacity 0.6s;
}

.submit-btn:active .btn-ripple {
    opacity: 1;
    transform: scale(2);
}
</style>

