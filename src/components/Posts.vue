<template>
  <div class="container">
    <h3 class="text-primary">Posts</h3>
    <div>
      <form @submit.prevent="newPost()" action method="post" class="form-group w-50">
        <input type="text" class="form-control m-2" v-model="post.title" />
        <textarea class="form-control m-2" v-model="post.body"></textarea>
        <button
          type="submit"
          :disabled="post.title == '' || post.body == ''"
          class="btn btn-sm btn-success m-2"
        >Add Post</button>
      </form>
    </div>
    <div class="clearfix"></div>
    <div class="card p-2 mb-2" v-for="(item,index) in allPosts" :key="`${index}-posts`">
      <h4 class="card-title text-success"> {{item.title}}</h4>
      <div class="card-text">
        <span class="float-right cursor-pointer" @click="dialogRemovePost(index)">
          <i class="fa fa-trash fa-lg"></i>
        </span>
        <span style="white-space: pre;">{{item.body}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

var defaultPost = { title: "", body: "" };

export default {
  data() {
    return {
      post: { title: "", body: "" }
    };
  },

  created() {
    this.fetchPosts();
  },

  computed: mapGetters(["allPosts"]),

  methods: {
    ...mapActions(["fetchPosts", "addPost", "removePost"]),
    newPost() {
      if (this.post.title == "" || this.post.body == "") return;
      
      this.addPost(this.post);
      this.post = {title: '', body: ''};
    },
    dialogRemovePost(index) {
      this.$dialog.confirm('Sure to remove this post?', {loader: true})
        .then((dialog) => {
            this.removePost({index, dialog})
        })
        .catch(e => {
            //
        });
    }
  }
};
</script>