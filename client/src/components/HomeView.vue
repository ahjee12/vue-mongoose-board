<template lang="">
  <div>
    <h1>새 게시글 만들기</h1>
    <textarea v-model="content"></textarea>
    <div>
      <button @click="createArticle">생성하기</button>
    </div>
    <h2>작성된 게시글</h2>
    <Card
      v-for="a in articles.slice().reverse()"
      :key="a._id"
      :article="a"
      @update="updateCard"
      @delete="deleteCard"
      >{{ a.content }}</Card
    >
  </div>
</template>
<script>
import axios from "axios";
import Card from "@/components/CardView";

export default {
  components: {
    Card,
  },
  data() {
    return {
      content: "",
      articles: [],
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    updateCard({ id, content }) {
      const articleIndex = this.articles.findIndex((e) => e._id === id);
      if (articleIndex < 0) return;
      this.articles[articleIndex].content = content;
    },
    deleteCard({ id }) {
      const articleIndex = this.articles.findIndex((e) => e._id === id);
      if (articleIndex < 0) return;
      this.articles.splice(articleIndex, 1);
    },
    async getArticle() {
      const { data } = await axios.get("http://localhost:3000/read");
      this.articles = data;
    },
    async createArticle() {
      if (this.content.length === 0) {
        window.alert("글을 입력해 주세요!");
        return;
      }
      const { data } = await axios.post("http://localhost:3000/create", {
        content: this.content,
      });
      if (!data) {
        window.alert("생성 실패!");
        return;
      }
      window.alert("생성 성공");
      this.articles.push(data);
      this.content = "";
    },
  },
};
</script>
<style lang=""></style>
