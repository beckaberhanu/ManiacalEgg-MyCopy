<template>
  <div class="class-listing" :class="{collapsed: isActive}">
    <div class="preview-section" @click="toggleExpand()">
      <h2 class="preview-course-title">{{data.Title}}</h2>
      <h3 class="preview-course-code">{{data.ClassCode}}</h3>
      <h3 v-if="data.Departments.length>1" class="preview-course-department">Cross Listed Course</h3>
      <h3 v-else class="preview-course-department">{{data.Departments[0]}}</h3>
    </div>
    <div class="detail-section">
      <p class="course-description">{{data.Description}}</p>
      <div class="course-details">
        <p class="course-detail-category">Department</p>
        <ul class="course-detail-info">
          <li v-for="Department in data.Departments" :key="Department">{{Department}}</li>
        </ul>

        <p class="course-detail-category">Distribution Requirments</p>
        <ul class="course-detail-info">
          <li>{{data.DistributionReq}}</li>
        </ul>

        <p class="course-detail-category">General Education Requirments</p>
        <ul class="course-detail-info">
          <li v-for="(GeneralEd,index2) in data.GeneralEds" :key="index2">{{GeneralEd}}</li>
        </ul>

        <p class="course-detail-category">Prerequisites</p>
        <ul class="course-detail-info">
          <li v-for="(Prereq,index2) in data.Prerequisites" :key="index2">{{Prereq}}</li>
        </ul>
      </div>
      <table class="sections-table">
        <thead>
          <tr class="section-table-top-row">
            <th>Section</th>
            <th>Instructor</th>
            <th>Location</th>
            <th>Time</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          <tr class="section-table-entry-row" v-for="section in data.Sections" :key="section">
            <td>{{section.id}}</td>
            <td>{{section.Instructor}}</td>
            <td>{{section.Room}}</td>
            <td>
              <ul class="section-table-time-cell">
                <li>{{section.Date}}</li>
                <li>{{ reformatTimeNormal(section.Time[0]) }} to {{ reformatTimeNormal(section.Time[1]) }}</li>
              </ul>
            </td>
            <td>{{section.Availability[0]}}/{{section.Availability[1]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassListing",
  props: {
    data: Object
  },
  data() {
    return {
      isActive: true
    };
  },
  methods: {
    toggleExpand: function() {
      this.isActive = !this.isActive;
    },
    reformatTimeNormal: function(time) {
      console.log(time);
      var hour = Math.floor(time % 12);
      hour = hour == 0 ? 12 : hour;
      var minute = time - Math.floor(time);
      minute = Math.round(minute * 60);
      minute = minute < 10 ? "0" + minute : minute;
      var am_pm = time < 12 ? "am" : "pm";
      return hour + ":" + minute + " " + am_pm;
    }
  }
};
</script>
<style scoped>
.class-listing {
  padding: 15px 20px;
  border: 1px solid #d2d2d2;
  border-radius: 15px;
  margin: 10px 30px;
  box-shadow: 0 4px 14px rgba(0, 13, 173, 0.16);
}
.preview-section {
  display: flex;
  align-content: center;
  justify-content: flex-start;
}
.preview-section:hover {
  cursor: pointer;
}
.class-listing.collapsed .detail-section {
  display: none;
}
.preview-course-title {
  font-family: "DIN Condensed";
  font-size: 1.5em;
  text-align: start;
  /* width: 580px; */
  margin: 0;

  min-width: 300;
  flex: 5;
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
  min-width: 400px;
  flex: 1;
  margin: 0 10px;
}

.detail-section {
  display: flex;
  margin: 10px 0 5px 0;

  border-width: 2px 0 0 0;
  border-style: solid;
  border-color: #d2d2d2;
  padding: 10px 0;
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
  border-width: 0 2px 0 0;
  border-style: solid;
  border-color: #d2d2d2;
  flex: 2;
  min-width: 180px;
}
.course-detail-category {
  font-family: "DIN Condensed";
  font-size: 1.1em;
  text-align: start;
  margin: 0;
}
.course-detail-info {
  font-size: 0.75em;
  text-align: start;
  list-style-image: url("../assets/Bullet.svg");
  padding: 0 0 0 20px;
  margin-bottom: 5px;
}
.sections-table {
  border-collapse: collapse;
  flex: 1;
  margin-left: 20px;
  margin: 0 10px;
  flex: 1;
  min-width: 400px;
}
.section-table-top-row {
  font-size: 1.1em;
  font-family: "DIN Condensed";
}
.section-table-time-cell {
  list-style-image: url("../assets/Bullet.svg");
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