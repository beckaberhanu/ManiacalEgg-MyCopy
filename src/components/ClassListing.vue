<template>
  <div class="class-listing" :class="{collapsed: isCollapsed, hasExpanded: hasExpanded}">
    <div class="preview-section" @click="toggleExpand()">
      <div class="preview-course-title-container">
        <h2 class="preview-course-title">{{data.Title}}</h2>
      </div>
      <h3 class="preview-course-code">{{crossListedClassCode(data.ClassCode)}}</h3>
      <h3 v-if="data.Departments.length>1" class="preview-course-department">Cross Listed Course</h3>
      <h3 v-else class="preview-course-department">{{data.Departments[0]}}</h3>
    </div>
    <div class="detail-section">
      <div style="display:flex; padding: 9px 20px;">
        <p class="course-description">{{data.Description}}</p>
        <div class="course-details">
          <p class="course-detail-category">Department</p>
          <ul class="course-detail-info">
            <li v-for="(Department,index2) in data.Departments" :key="index2">{{Department}}</li>
          </ul>

          <p class="course-detail-category" v-if="data.DistributionReq">Distribution Requirments</p>
          <ul class="course-detail-info" v-if="data.DistributionReq">
            <li>{{data.DistributionReq}}</li>
          </ul>

          <p
            class="course-detail-category"
            v-if="data.GeneralEds.length>0"
          >General Education Requirments</p>
          <ul class="course-detail-info" v-if="data.GeneralEds.length>0">
            <li v-for="(GeneralEd,index2) in data.GeneralEds" :key="index2">{{GeneralEd}}</li>
          </ul>

          <p class="course-detail-category" v-if="data.Prerequisites">Prerequisites</p>
          <ul class="course-detail-info" v-if="data.Prerequisites">
            <li v-for="(Prereq,index2) in data.Prerequisites" :key="index2">{{Prereq}}</li>
          </ul>
        </div>
      </div>
      <div class="sections-table-container">
        <table class="sections-table">
          <thead>
            <tr class="section-table-top-row">
              <th>Section</th>
              <th>Instructor</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="section-table-entry-row"
              v-for="(section, index2) in data.Sections"
              :key="index2"
            >
              <td>{{section.id}}</td>
              <td>{{section.Instructor}}</td>
              <td>{{section.Room}}</td>
              <td>
                <ul class="section-table-time-cell">
                  <li>{{section.Day}}</li>
                </ul>
              </td>
              <td>
                <ul class="section-table-time-cell">
                  <li>{{ reformatTimeNormal(section.Time[0]) }} to {{ reformatTimeNormal(section.Time[1]) }}</li>
                </ul>
              </td>
              <td>{{section.Availability[0]}}/{{section.Availability[1]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassListing",
  props: {
    data: Object,
    isCollapsed: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      hasExpanded: false,
    };
  },
  methods: {
    toggleExpand: function () {
      this.isCollapsed = !this.isCollapsed;
      this.hasExpanded = true;
    },
    reformatTimeNormal: function (time) {
      var hour = Math.floor(time % 12);
      hour = hour == 0 ? 12 : hour;
      var minute = time - Math.floor(time);
      minute = Math.round(minute * 60);
      minute = minute < 10 ? "0" + minute : minute;
      var am_pm = time < 12 ? "am" : "pm";
      return hour + ":" + minute + " " + am_pm;
    },
    crossListedClassCode: function (codes) {
      var newCode = codes[0].substring(0, codes[0].indexOf(" "));
      for (var i = 1; i < codes.length; i++) {
        newCode += "/" + codes[i].substring(0, codes[i].indexOf(" "));
      }
      newCode += " " + codes[0].substring(codes[0].indexOf(" ") + 1);
      return newCode;
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap");
.class-listing {
  border: 1px solid #d2d2d2;
  border-radius: 18px;
  margin: 10px 30px;
  box-shadow: 0 4px 14px rgba(0, 13, 173, 0.16);
}
.preview-section {
  padding: 9px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.preview-section:hover {
  cursor: pointer;
}
.preview-course-title-container {
  margin: 0;
  min-width: 400px;
  flex: 5;
  height: 62px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.preview-course-title {
  font-family: "Oswald", sans-serif;
  font-size: 1.2em;
  font-weight: 500;
  text-align: start;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.preview-course-code {
  text-align: start;
  font-size: 1em;
  margin: 0;

  min-width: 180px;
  flex: 2;
  padding: 0 20px;
}
.preview-course-department {
  text-align: start;
  font-size: 1em;
  margin: 0;
  min-width: 300px;
  flex: 1;
  margin: 0 10px;
}

.class-listing.collapsed:not(.hasExpanded) .detail-section {
  display: flex;
  flex-direction: column;
  height: 0;
  padding: 0;
  margin: 0;
  visibility: hidden;
}
.class-listing.collapsed.hasExpanded .detail-section {
  display: flex;
  flex-direction: column;
  animation: collapse-tile-anim 0.4s cubic-bezier(0.4, 0, 0.59, 1);
  max-height: 0;
  padding: 0;
  margin: 0;
  opacity: 0;
  overflow: hidden;
}
@keyframes collapse-tile-anim {
  0% {
    max-height: 400px;
    opacity: 1;
  }
  100% {
    max-height: 0px;
    opacity: 0;
  }
}

.class-listing:not(.collapsed) .detail-section {
  display: flex;
  flex-direction: column;
  height: 0%;
  border-width: 2px 0 0 0;
  border-style: solid;
  border-color: #d2d2d2;
  animation: expand-tile-anim 0.6s cubic-bezier(0.4, 0, 0.59, 1);
}
@keyframes expand-tile-anim {
  0% {
    max-height: 0px;
    opacity: 0;
  }
  100% {
    max-height: 400px;
    opacity: 1;
  }
}

.course-description {
  margin: 0;
  padding-right: 20px;
  border-width: 0 2px 0 0;
  border-style: solid;
  border-color: #d2d2d2;
  font-size: 0.8em;
  text-align: start;
  flex: 5;
  min-width: 300px;
}

.course-details {
  padding: 0 20px;
  border: none;
  flex: 2;
  min-width: 180px;
}
.course-detail-category {
  font-family: "Oswald", sans-serif;
  font-size: 1em;
  font-weight: 500;
  text-align: start;
  margin: 0;
}
.course-detail-info {
  font-size: 0.75em;
  text-align: start;
  list-style-image: url("../assets/Icons/Bullet.svg");
  padding: 0 0 0 20px;
  margin-bottom: 5px;
}
.sections-table-container {
  padding: 9px 20px;
  border-width: 2px 0 0 0;
  border-style: solid;
  border-color: #d2d2d2;
}
.sections-table {
  border-collapse: collapse;
  flex: 1;
  margin: 0;
  flex: 1;
  width: 100%;
  min-width: 400px;
}
.section-table-top-row {
  font-size: 0.9em;
  font-family: "Oswald", sans-serif;
}
.section-table-time-cell {
  list-style-image: url("../assets/Icons/Bullet.svg");
  padding: 0 0 0 20px;
  margin: 0;
}
.section-table-top-row {
  border-width: 0 0 2px 0;
  border-style: solid;
  border-color: #71c5e8;
}
.section-table-entry-row {
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #d44420;
  font-size: 0.7em;
}
table tr {
  font-size: 0.8em;
}
th,
td {
  text-align: start;
}
ul {
  margin: 0;
}
</style>