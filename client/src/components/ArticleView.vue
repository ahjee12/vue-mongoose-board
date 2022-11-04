<template lang="">
  <div>
    <Card :article="article" @update="updateCard" @delete="moveToHome" />
  </div>
</template>
<script>
import Card from "@/components/CardView";
import axios from "axios";

export default {
  components: {
    Card,
  },
  data() {
    return {
      article: {
        id: null,
        content: null,
        createdAt: null,
      },
    };
  },
  created() {
    this.findOneArticle();
  },
  methods: {
    moveToHome() {
      this.$router.push({
        name: "Home",
      });
    },
    // route로 특정 article로 이동,
    // article 변수에는 해당 card article만 저장 (by findOneArticle)
    // id 없어도 됨
    updateCard({ content }) {
      // const articleIndex = this.articles.findIndex((e) => e._id === id);
      // if (articleIndex < 0) return;
      this.article.content = content;
    },
    async findOneArticle() {
      const articleId = this.$route.params.id;
      console.log("route ", this.$route);
      console.log("params ", this.$route.params);
      console.log("id ", articleId);
      const { data } = await axios.get(
        `http://localhost:3000/read/${articleId}`
      );
      console.log("data ", data);
      this.article = {
        ...data,
      };
      //   console.log(this.article);
    },
  },
};
</script>
<style lang=""></style>
