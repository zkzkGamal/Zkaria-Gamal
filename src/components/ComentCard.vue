<template>
    <div class="glass-card comments-section">
        <h5 class="comments-title">Comments: {{ comments.length }}</h5>

        <div class="comment-form-wrapper">
            <form @submit.prevent="PostComment" v-if="user" class="comment-form">
                <div class="input-group">
                    <input required class="input-field" placeholder="Leave a comment..." v-model="commentbody">
                </div>
                <input class="btn-premium submit-btn" type="submit" value="Submit">
            </form>
            <div v-else class="login-prompt">
                <p>Create an account to comment:</p>
                <router-link class="btn-premium login-btn" to="/register">Register/Login</router-link>
            </div>
        </div>

        <div class="comments-list">
            <div class="comment-item" v-for="cm in comments" :key="cm.id">
                <img class="author-pic" :src="getAuthorThumbnail(cm.user)" alt="User Thumbnail">
                <div class="comment-content">
                    <p class="comment-author">{{ getAuthorFullName(cm.user) }}</p>
                    <p class="comment-body">{{ cm.comment }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
    name: 'CommentCard',
    props: ['post_id'],
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
    }, data: function () {
        return {
            comments: [],
            userProfile: [],
            commentbody: '',
        }
    }
    , mounted() {
        this.getComments()
    }
    , methods: {
        getComments() {
            axios
                .get(`https://zkzk.softzm.cloud/api/comment/${this.post_id}`)
                .then((response) => {
                    this.comments = response.data

                    // Iterate through comments and fetch user data for each comment
                    this.comments.forEach(comment => {
                        this.getUser(comment.user);
                    });
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        getUser(id) {
            axios
                .get(`https://zkzk.softzm.cloud/api/ProfileDetail/${id}`)
                .then((response) => {
                    this.userProfile.push(response.data)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
        , getAuthorThumbnail(userId) {
            let pic = ''
            this.userProfile.forEach(element => {
                if (element[0].user == userId) {
                    pic = element[0].thumbnail;
                }
            });
            return pic
        }, getAuthorId(userId) {
            let id = ''
            this.userProfile.forEach(element => {
                if (element[0].user == userId) {
                    id = element[0].id;
                    return id
                }
            });
            return id
        },
        getAuthorFullName(userId) {
            let full_name = 'Unknown Author'
            this.userProfile.forEach(ele => {
                if (ele[0].user == userId) {
                    const first_name = ele[0].f_name
                    const last_name = ele[0].l_name
                    full_name = first_name + ' ' + last_name
                }
            })
            return full_name
            // Handle it as needed
        }, PostComment() {
            // this.getUser(this.user.id)
            const headers = {
                Authorization: `Token ${this.token}`,
                'Content-type': 'application/json',
                'X-CSRFToken': this.csrfToken,
            }
            axios.post(`https://zkzk.softzm.cloud/api/comment/${this.post_id}`, {
                post: this.post_id,
                user: this.user.id,
                comment: this.commentbody,
            }, { headers }).then((response) => {
                console.log(response.data);
                // Optionally, add the posted comment to your comments array
                this.comments.push(response.data);
                // Clear the comment input field
                this.commentbody = '';
                location.reload()
            }).catch((error) => {
                console.error('can not post comment ' + this.csrfToken + error);
                if (error.response) {
                    console.error('Response status:', error.response.status);
                    console.error('Response data:', error.response.data);
                }
                alert(this.token)
            })
        }
    }
}
</script>

<style scoped>
.comments-section {
    padding: var(--space-lg);
    margin-top: var(--space-xl);
}

.comments-title {
    font-size: 1.25rem;
    color: var(--text-hero);
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--border-dim);
}

.comment-form-wrapper {
    margin-bottom: var(--space-lg);
}

.comment-form {
    display: flex;
    align-items: flex-start;
    /* Align top if button is tall, or center */
    gap: var(--space-sm);
    flex-wrap: wrap;
    /* responsive */
}

.input-group {
    flex-grow: 1;
    min-width: 200px;
}

.submit-btn {
    white-space: nowrap;
    height: auto;
    align-self: flex-start;
    /* Matches input height if tweaked, or top align */
    margin-top: 0;
    /* Override any defaults */
}

.comments-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.comment-item {
    display: flex;
    gap: var(--space-md);
    padding: var(--space-md);
    background: var(--bg-alt);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-subtle);
    transition: var(--transition-fast);
}

.comment-item:hover {
    border-color: var(--border-medium);
}

.author-pic {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--emerald-500);
    flex-shrink: 0;
}

.comment-content {
    flex-grow: 1;
}

.comment-author {
    font-weight: 700;
    color: var(--emerald-500);
    margin-bottom: 0.25rem;
    font-size: 1rem;
}

.comment-body {
    color: var(--text-body);
    font-size: 0.95rem;
    line-height: 1.6;
}

.login-prompt {
    text-align: center;
    padding: var(--space-lg);
    background: var(--bg-alt);
    border-radius: var(--radius-md);
    color: var(--text-muted);
    border: 1px dashed var(--border-dim);
}

.login-btn {
    margin-top: var(--space-sm);
    display: inline-flex;
}

@media (max-width: 600px) {
    .comment-form {
        flex-direction: column;
        align-items: stretch;
    }

    .submit-btn {
        width: 100%;
    }

    .comment-item {
        flex-direction: column;
        align-items: flex-start;
    }

    .author-pic {
        width: 40px;
        height: 40px;
    }
}
</style>
