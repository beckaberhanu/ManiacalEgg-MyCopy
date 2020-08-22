<template>
  <div id="app">
    <div class="left-panel">
      <div class="search-filters"></div>
      <div class="search-btns-panel">
        <button class="clear-filters-btn float-btn">Clear</button>
        <button class="submit-filters-btn float-btn">Apply filters</button>
      </div>
    </div>
    <div class="right-panel">
      <div class="site-header">
        <h1 class="site-title">Maniacal Egg</h1>
        <label for="collapse-listings">
          <input id="collapse-listings" type="checkbox" v-model="collapseClassListings" />
          Collapsed Listings
        </label>
        <button @click="search(filter1)">Check filter</button>
      </div>
      <div class="class-listings-scroll-panel">
        <div class="class-listings-scroll-header">
          <h2 class="scroll-headers course-title-header">Course Title</h2>
          <h2 class="scroll-headers course-id-header">Course Id</h2>
          <h2 class="scroll-headers department-header">Department</h2>
        </div>
        <ClassListing
          v-for="(course, index) in courses"
          :key="index"
          :data="course"
          :isCollapsed="collapseClassListings"
        ></ClassListing>
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
    ClassListing,
  },
  data() {
    return {
      courses: courses,
      filter1: {
        Title: "",
        Schedules: [],
        Departments: [],
        DistributionReq: "",
        GeneralEds: ["Q1", "WA"],
      },
      collapseClassListings: true,
    };
  },
  methods: {
    checkTimeMatch: function (course, schedules) {
      if (schedules.length == 0) {
        return true;
      }
      var match = false;
      schedules.forEach(function (schedule) {
        course.Sections.forEach(function (section) {
          var DateMatch = schedule.Day == section.Day;
          var TimeMatch =
            schedule.Time[0] <= section.Time[0] &&
            schedule.Time[1] >= section.Time[1];
          if (DateMatch && TimeMatch) {
            match = true;
          }
        });
      });
      return match;
    },
    checkDeptMatch: function (course, departments) {
      if (departments.length == 0) {
        return true;
      }
      var match = false;
      departments.forEach(function (department) {
        if (course.Departments.includes(department)) {
          match = true;
        }
      });
      return match;
    },
    checkGeneralEdsMatch: function (course, generalEds) {
      if (generalEds.length == 0) {
        return true;
      }
      var numMatched = 0;
      generalEds.forEach(function (generalEd) {
        if (["Q1", "Q2", "Q3"].includes(generalEd)) {
          numMatched += course.GeneralEds.includes(
            "Quantitative Thinking " + generalEd
          );
        } else if (["WA", "WP", "WC"].includes(generalEd)) {
          numMatched += course.GeneralEds.includes("Writing " + generalEd);
        } else if (course.GeneralEds.includes(generalEd)) {
          numMatched += 1;
        }
      });
      return numMatched == generalEds.length;
    },
    search: function (filter) {
      console.log(filter);
      this.courses = [];
      courses.forEach(function (course) {
        var TitleMatch = course.Title == filter.Title || filter.Title == "";
        var DepartmentMatch = this.checkDeptMatch(course, filter.Departments);
        var TimeMatch = this.checkTimeMatch(course, filter.Schedules);
        var DistReqtMatch =
          course.DistributionReq == filter.DistributionReq ||
          filter.DistributionReq == "";
        var GeneralEdsMatch = this.checkGeneralEdsMatch(
          course,
          filter.GeneralEds
        );

        if (course.Title == "The Obama Presidency") {
          console.log(course);
          console.log("Title Match", TitleMatch);
          console.log(
            "sections:",
            course.Sections,
            "timefilter:",
            filter.Schedules
          );
          console.log("Department Match", DepartmentMatch);
          console.log("Time Match", TimeMatch);
          console.log("Dist Reqt Match", DistReqtMatch);
          console.log("GeneralEds Match", GeneralEdsMatch);
        }

        if (
          TitleMatch &&
          TimeMatch &&
          DepartmentMatch &&
          DistReqtMatch &&
          GeneralEdsMatch
        ) {
          console.log("yipi");
          this.courses.push(course);
        }
      }, this);
    },
  },
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.clear-filters-btn {
  border: none;
  color: #fff;
  font-size: 1em;
  font-weight: 700;
  padding: 12px 20px;
  border-radius: 17px;
  margin: 0 10px;
  box-shadow: 0 7px 14px rgba(0, 13, 173, 0.305);
  background-color: #01426a;
}
.submit-filters-btn {
  border: none;
  color: #fff;
  font-size: 1em;
  font-weight: 700;
  border-radius: 17px;
  padding: 12px 20px;
  margin: 0 20px 0 10px;
  box-shadow: 0 7px 14px rgba(173, 0, 0, 0.305);
  background-color: #e44420;
}
.float-btn:hover {
  transform: scale(1.07);
  animation: btn-up 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
@keyframes btn-up {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.07);
  }
}
.right-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-width: 0 0 1px 0;
  border-color: #c7c7c7;
  border-style: solid;
  padding: 0px 20px;
}
.site-title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3em;
  font-weight: 900;
  text-align: start;
  margin: 0;
  padding: 10px 0px;
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
  position: -moz-sticky;
  position: -ms-sticky;
  position: -o-sticky;
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
  min-width: 400px;
  flex: 5;
}
.scroll-headers.course-id-header {
  padding: 0 20px;
  min-width: 180px;
  flex: 2;
}
.scroll-headers.department-header {
  min-width: 300px;
  flex: 1;
  margin: 0 10px;
}
</style>
