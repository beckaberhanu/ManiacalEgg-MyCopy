<template>
  <div id="app">
    <div class="left-panel">
      <div class="search-filters">
        <drop-down title="General Education Requirements">
          <label class="filter-checkbox-label">
            <input
              class="filter-checkbox"
              type="checkbox"
              v-model="filters.GeneralEds.Internationalism"
            />
            Internationalism
          </label>
          <label class="filter-checkbox-label">
            <input
              class="filter-checkbox"
              type="checkbox"
              v-model="filters.GeneralEds['U.S. Identities and Differences']"
            />
            US Identities &amp; Differences
          </label>
          <h3>Quantitative Thinking</h3>
          <div style="display: flex; min-height: 21px;">
            <label class="filter-checkbox-label">
              <input
                class="filter-checkbox"
                type="checkbox"
                v-model="filters.GeneralEds.Q1"
              />
              Q1
            </label>
            <label class="filter-checkbox-label">
              <input
                class="filter-checkbox"
                type="checkbox"
                v-model="filters.GeneralEds.Q2"
              />
              Q2
            </label>
            <label class="filter-checkbox-label">
              <input
                class="filter-checkbox"
                type="checkbox"
                v-model="filters.GeneralEds.Q3"
              />
              Q3
            </label>
          </div>
          <h3>Writing</h3>
          <div style="display: flex; min-height: 21px;">
            <label class="filter-checkbox-label">
              <input
                class="filter-checkbox"
                type="checkbox"
                v-model="filters.GeneralEds.WA"
              />
              WA
            </label>
            <label class="filter-checkbox-label">
              <input
                class="filter-checkbox"
                type="checkbox"
                v-model="filters.GeneralEds.WP"
              />
              WP
            </label>
            <label class="filter-checkbox-label">
              <input
                class="filter-checkbox"
                type="checkbox"
                v-model="filters.GeneralEds.WC"
              />
              WC
            </label>
          </div>
        </drop-down>
        <drop-down title="Distribution Requirements">
          <label class="filter-checkbox-label">
            <input
              class="filter-checkbox"
              type="checkbox"
              v-model="
                filters.DistributionReq['Natural science and mathematics']
              "
            />
            Natural science and mathematics
          </label>
          <label class="filter-checkbox-label">
            <input
              class="filter-checkbox"
              type="checkbox"
              v-model="filters.DistributionReq['Social science']"
            />
            Social science
          </label>
          <label class="filter-checkbox-label">
            <input
              class="filter-checkbox"
              type="checkbox"
              v-model="filters.DistributionReq.Humanities"
            />
            Humanities
          </label>
          <label class="filter-checkbox-label">
            <input
              class="filter-checkbox"
              type="checkbox"
              v-model="filters.DistributionReq['Fine arts']"
            />
            Fine arts
          </label>
        </drop-down>
        <drop-down title="Departments">
          <label
            v-for="(department, index) in Object.keys(filters.Departments)"
            :key="index"
            class="filter-checkbox-label"
          >
            <input
              class="filter-checkbox"
              type="checkbox"
              v-model="filters.Departments[department]"
            />
            {{ department }}
          </label>
        </drop-down>
        <drop-down title="Date and Time">
          <button class="add-time-button float-btn" @click="addBaseTime()">
            Add
          </button>
          <DateTimeSlider
            v-for="index in filters.Schedules.length"
            :key="index"
            v-model="filters.Schedules[index - 1]"
            v-on:remove="removeTime(index - 1)"
          >
          </DateTimeSlider>
        </drop-down>
      </div>
      <div class="search-btns-panel">
        <button class="clear-filters-btn float-btn">Clear</button>
        <button class="submit-filters-btn float-btn" @click="search()">
          Apply filters
        </button>
      </div>
    </div>
    <div class="right-panel">
      <div class="site-header">
        <h1 class="site-title">Maniacal Egg</h1>
        <label for="collapse-listings">
          <input
            id="collapse-listings"
            type="checkbox"
            v-model="collapseClassListings"
          />
          Collapsed Listings
        </label>
      </div>
      <div class="class-listings-scroll-header">
        <h2 class="scroll-headers course-title-header">Course Title</h2>
        <h2 class="scroll-headers course-id-header">Course Id</h2>
        <h2 class="scroll-headers department-header">Department</h2>
      </div>
      <div class="class-listings-scroll-panel">
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
import DropDown from "./DropDown.vue";
import DateTimeSlider from "./DateTimeSlider.vue";

import { courses } from "../assets/Data/courseCatalog.js";
import { departments } from "../assets/Data/departments.js";

export default {
  name: "App",
  components: {
    DateTimeSlider,
    ClassListing,
    DropDown,
  },
  data() {
    return {
      courses: courses,
      rangevalue: [30, 70],
      filters: {
        Title: "",
        CourseID: "",
        Instructor: "",
        Schedules: [],
        Departments: departments,
        DistributionReq: {
          "Natural science and mathematics": false,
          Humanities: false,
          "Social science": false,
          "Fine arts": false,
        },
        GeneralEds: {
          Internationalism: false,
          "U.S. Identities and Differences": false,
          Q1: false,
          Q2: false,
          Q3: false,
          WA: false,
          WP: false,
          WC: false,
        },
      },
      collapseClassListings: true,
    };
  },
  methods: {
    addBaseTime: function() {
      this.filters.Schedules.push({
        Time: [8, 16],
        Day: "M W F",
      });
    },
    removeTime: function(index) {
      this.filters.Schedules.splice(index, 1);
    },
    preprocess: function() {
      // formats the filters to better fit the search functions
      var filters = this.filters;
      var filter = {};
      Object.keys(filters).forEach(function(key) {
        if (filters[key].constructor == Object) {
          var array = [];
          Object.keys(filters[key]).forEach(function(key2) {
            if (filters[key][key2]) {
              array.push(key2);
            }
          });
          filter[key] = array;
        } else {
          filter[key] = filters[key];
        }
      });
      return filter;
    },
    checkTimeMatch: function(course, schedules) {
      if (schedules.length == 0) {
        return true;
      }
      var match = false;
      schedules.forEach(function(schedule) {
        course.Sections.forEach(function(section) {
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
    checkDeptMatch: function(course, departments) {
      if (departments.length == 0) {
        return true;
      }
      var match = false;
      departments.forEach(function(department) {
        if (course.Departments.includes(department)) {
          match = true;
        }
      });
      return match;
    },
    checkDistribMatch: function(course, distributions) {
      if (distributions.length == 0) {
        return true;
      }
      var match = false;
      distributions.forEach(function(distribution) {
        if (course.DistributionReq == distribution) {
          match = true;
        }
      });
      return match;
    },
    checkGeneralEdsMatch: function(course, generalEds) {
      if (generalEds.length == 0) {
        return true;
      }
      var numMatched = 0;
      generalEds.forEach(function(generalEd) {
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
    search: function() {
      var filter = this.preprocess();
      console.log("**** filter", filter);
      this.courses = [];
      courses.forEach(function(course) {
        var TitleMatch = course.Title == filter.Title || filter.Title == "";
        var DepartmentMatch = this.checkDeptMatch(course, filter.Departments);
        var TimeMatch = this.checkTimeMatch(course, filter.Schedules);
        var DistReqtMatch = this.checkDistribMatch(
          course,
          filter.DistributionReq
        );
        var GeneralEdsMatch = this.checkGeneralEdsMatch(
          course,
          filter.GeneralEds
        );

        // if (course.Title == "The Obama Presidency") {
        //   // console.log(course);
        //   // console.log("Title Match", TitleMatch);
        //   // console.log(
        //   //   "sections:",
        //   //   course.Sections,
        //   //   "timefilter:",
        //   //   filter.Schedules
        //   // );
        //   // console.log("Department Match", DepartmentMatch);
        //   // console.log("Time Match", TimeMatch);
        //   // console.log("Dist Reqt Match", DistReqtMatch);
        //   // console.log("GeneralEds Match", GeneralEdsMatch);
        // }

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
button {
  cursor: pointer;
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
  min-width: 350px;
}
.search-filters {
  flex: 1;
  overflow: scroll;
}
.filter-checkbox-label {
  text-align: start;
}
.add-time-button {
  border: none;
  align-self: flex-end;
  color: #fff;
  font-size: 1em;
  font-weight: 700;
  border-radius: 14px;
  padding: 8px 20px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 13, 173, 0.305);
  background-color: #01426a;
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
  transform: scale(1);
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
  transform: scale(1);
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
  transition: transform 0.4s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
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
  position: relative;
}
.class-listings-scroll-panel .class-listing:first-child {
  margin-top: 60px;
}
.class-listings-scroll-header {
  margin: 10px 20px;
  height: 40px;
  align-self: stretch;
  border-radius: 15px;
  border: 1px solid #c7c7c7;
  box-shadow: 0 4px 16px rgba(173, 0, 0, 0.16);
  background-color: rgb(240, 240, 255);
  display: flex;
  align-items: center;
  padding: 0 30px;
  margin-bottom: -50px;
  z-index: 5;
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
