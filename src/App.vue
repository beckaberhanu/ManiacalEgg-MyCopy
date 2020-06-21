<template>
  <div id="app">
    <ClassListing :data="course"></ClassListing>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import ClassListing from "./components/ClassListing.vue";

export default {
  name: "App",
  components: {
    ClassListing
  },
  data() {
    return {
      course: {
        isActive: false,
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
