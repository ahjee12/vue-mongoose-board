<template lang="">
  <article>
    <div v-if="!isEditing" class="content">{{ article.content }}</div>
    <!-- <div class="created-at">{{moment(article.createdAt).format('M월 D일 HH:mm:ss')}}</div> -->
    <textarea v-else class="content" v-model="content"></textarea>
    <div class="created-at">
      {{ article.createdAt | moment("M월 D일 HH:mm:ss") }}
    </div>
    <!-- route 이동 -->
    <button v-if="!isEditing" @click="moveArticle">이동</button>
    <!-- 토글 버튼 -->
    <!-- <button @click="toggleTextArea">{{ !isEditing? '수정' : '수정 취소' }}</button> -->
    <button @click="toggleTextArea">{{ rewrite }}</button>
    <!-- none토글 버튼 -->
    <button v-if="!isEditing" @click="deleteArticle">삭제</button>
    <button v-else @click="updateArticle">수정 완료</button>
  </article>
</template>
<script>
import axios from "axios";

export default {
  // ★ Home에서 받는 Props
  props: {
    article: {
      // type: Object,
      default: {
        content: "",
        _id: null,
        createdAt: null,
      },
    },
  },
  data() {
    return {
      content: "",
      // false부터 시작
      isEditing: false,
      rewrite: "수정",
    };
  },
  //   mounted() {
  //     this.content = this.article.content;
  //   },
  methods: {
    toggleTextArea() {
      // 수정 클릭 -> textarea에 들어갈 content
      this.content = this.article.content;
      // 수정버튼을 토글로 만듦
      this.isEditing = !this.isEditing;
      // no 수정 - 수정 : yes 수정 - 수정 완료 버튼 보임
      !this.isEditing ? (this.rewrite = "수정") : (this.rewrite = "수정 취소");
    },
    // route이동하는 법
    moveArticle() {
      this.$router.push({
        name: "Article",
        params: {
          id: this.article._id,
        },
      });
    },
    async updateArticle() {
      const { data } = await axios.patch("http://localhost:3000/update", {
        id: this.article._id,
        content: this.content,
      });
      if (!data) return;
      // props로 받은 article 값 변경 - update event를 위로 올림
      this.$emit("update", { id: this.article._id, content: this.content });
      //   this.articles = data;
      console.log(data);
      this.isEditing = false;
      // no 수정 - 수정 : yes 수정 - 수정 완료 버튼 보임
      !this.isEditing ? (this.rewrite = "수정") : (this.rewrite = "수정 취소");
    },
    async deleteArticle() {
      const { data } = await axios.delete(
        `http://localhost:3000/delete/${this.article._id}`
      );
      if (!data) return;
      // props로 받은 article 삭제 - delete event를 위로 올림
      // ★인자로 object전달하면 받을 때도 object{} 형태여야 함
      this.$emit("delete", { id: this.article._id });
    },
  },
};
</script>
<style>
article {
  padding: 1em;
  box-shadow: 0 3px 3px #222222;
  margin-bottom: 1em;
  background: #fafafa;
}
</style>
