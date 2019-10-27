<template>
    <div class="container">
        <h3>Posts</h3>
        <div>
            <form @submit.prevent="addPost()" action="" method="post" class="form-group w-50">
                <input type="text" class="form-control m-2" v-model="post.title">
                <textarea class="form-control m-2" v-model="post.detail"></textarea>
                <button type="submit" class="btn btn-sm btn-success m-2">Add Post</button>
            </form>
        </div>
        <div class="clearfix"></div>
        <div class="card p-2 mb-2" v-for="(item,index) in allPosts" :key="`${index}-posts`">
            <h4 class="card-title text-success">{{item.title}}</h4>
            <div class="card-text">
                {{item.detail}}
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    data(){
        return {
            post: {title: '', detail: ''}
        }
    },
    computed: mapGetters(['allPosts']),
    methods: {
        addPost: function() {
            if(this.post.title == '' || this.post.detail == '') return;

            this.$store.commit('addPost', this.post)
            this.post = {title: '', detail: ''}
        }
    }
}
</script>