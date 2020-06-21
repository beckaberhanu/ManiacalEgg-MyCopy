<template>
  <div id="app">
    <div class="left-panel">
      <div class="search-btns"></div>
    </div>
    <div class="right-panel">
      <h1 class="site-title">Maniacal Egg</h1>
      <div class="class-listings-scroll-panel">
        <div class="column-keys"></div>
        <ClassListing v-for="i in 20" :key="i" :data="course"></ClassListing>
      </div>
    </div>
  </div>
</template>

<script>
import ClassListing from "./ClassListing.vue";

export default {
  name: "App",
  components: {
    ClassListing
  },
  data() {
    return {
      course: {
        Title: "Core Concept of Computer Science",
        ClassCode: "COMP 123",
        Department: "Computer Science",
        DistributionReq: "Natural Science and Mathematics",
        Description:
          "This course introduces the field of computer science, including central concepts such as the design and implementation of algorithms and programs, testing and analyzing programs, the representation of information within the computer, and the role of abstraction and metaphor in computer science. The exploration of these central ideas will draw examples from a range of application areas including multimedia processing, turtle graphics, and text processing. Course work will use the Python programming language.",
        GeneralEds: ["Quantitative Thinking Q3"],
        Prerequisites: [],
        Sections: [
          {
            id: "01",
            Instructor: "Lian Duan",
            Room: "OLRI 258",
            Date: "M W F",
            Time: [9.44, 10.44],
            Availability: [25, 25]
          },
          {
            id: "02",
            Instructor: "Elizabeth Ernst",
            Room: "OLRI 258",
            Date: "M W F",
            Time: [10.56, 11.56],
            Availability: [25, 25]
          },
          {
            id: "03",
            Instructor: "Elizabeth Ernst",
            Room: "OLRI 258",
            Date: "M W F",
            Time: [24.0, 13.0],
            Availability: [25, 25]
          },
          {
            id: "04",
            Instructor: "STAFF",
            Room: "OLRI 258",
            Date: "M W F",
            Time: [13.11, 14.11],
            Availability: [25, 25]
          },
          {
            id: "05",
            Instructor: "STAFF",
            Room: "OLRI 258",
            Date: "M W F",
            Time: [14.22, 15.22],
            Availability: [25, 25]
          }
        ]
      }
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
</style>