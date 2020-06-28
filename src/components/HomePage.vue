<template>
  <div id="app">
    <div class="left-panel">
      <div class="search-filters"></div>
      <div class="search-btns-panel"></div>
    </div>
    <div class="right-panel">
      <h1 class="site-title">Maniacal Egg</h1>
      <div class="class-listings-scroll-panel">
        <div class="class-listings-scroll-header">
          <h2 class="scroll-headers course-title-header">Course Title</h2>
          <h2 class="scroll-headers course-id-header">Course Id</h2>
          <h2 class="scroll-headers department-header">Department</h2>
        </div>
        <ClassListing v-for="(course, index) in courses" :key="index" :data="course"></ClassListing>
      </div>
    </div>
  </div>
</template>

<script>
import ClassListing from "./ClassListing.vue";
import { courses } from "../courseCatalog.js";

export default {
  name: "App",
  components: {
    ClassListing
  },
  data() {
    return {
      courses: courses
    };
  }
};
</script>

<style>
html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  height: 100%;
  width: 100%;
  display: flex;
}
.left-panel {
  width: 400px;
  border-width: 0 1px 0 0;
  border-color: #c7c7c7;
  border-style: solid;
  display: flex;
  flex-direction: column;
}
.search-filters {
  flex: 1;
}
.search-btns-panel {
  height: 80px;
  border-width: 1px 0 0 0;
  border-color: #c7c7c7;
  border-style: solid;
  justify-self: flex-end;
}
.right-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.site-title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3em;
  font-weight: 900;
  text-align: start;
  margin: 0;
  padding: 10px 20px;
  border-width: 0 0 1px 0;
  border-color: #c7c7c7;
  border-style: solid;
}
.class-listings-scroll-panel {
  align-self: center;
  flex: 1;
  width: 100%;
  overflow-y: scroll;
  align-items: stretch;
}
.class-listings-scroll-header {
  margin: 10px 20px;
  height: 40px;
  align-self: stretch;
  border-radius: 15px;
  border: 1px solid #c7c7c7;
  box-shadow: 0 4px 16px rgba(173, 0, 0, 0.16);
  position: -webkit-sticky;
  position: sticky;
  top: 10px;
  background-color: rgb(240, 240, 255);
  display: flex;
  align-items: center;
  padding: 0 30px;
}
.scroll-headers {
  margin: 0px;
  font-size: 1em;
  text-align: start;
}
.scroll-headers.course-title-header {
  min-width: 300px;
  flex: 5;
}
.scroll-headers.course-id-header {
  padding: 0 20px;
  min-width: 180px;
  flex: 2;
}
.scroll-headers.department-header {
  min-width: 400px;
  flex: 1;
  margin: 0 10px;
}
</style>