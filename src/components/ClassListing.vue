<template>
  <div class="class-listing" :class="{collapsed: isActive}">
    <div class="preview-section" @click="toggleExpand()">
      <h2 class="preview-course-title">{{data.Title}}</h2>
      <h3 class="preview-course-code">{{data.ClassCode}}</h3>
      <h3 class="preview-course-department">{{data.Department}}</h3>
    </div>
    <div class="detail-section">
      <p class="course-description">{{data.Description}}</p>
      <div class="course-details">
        <p class="course-detail-category">Department</p>
        <ul class="course-detail-info">
          <li>{{data.Department}}</li>
        </ul>

        <p class="course-detail-category">Distribution Requirments</p>
        <ul class="course-detail-info">
          <li>{{data.DistributionReq}}</li>
        </ul>

        <p class="course-detail-category">General Education Requirments</p>
        <ul class="course-detail-info">
          <li v-for="(GeneralEd,index2) in data.GeneralEds" :key="index2">{{data.GeneralEd}}</li>
        </ul>

        <p class="course-detail-category">Prerequisites</p>
        <ul class="course-detail-info">
          <li v-for="(Prereq,index2) in data.Prerequisites" :key="index2">{{Prereq}}</li>
        </ul>
      </div>
      <table class="sections-table">
        <tr class="section-table-top-row">
          <th>Section</th>
          <th>Instructor</th>
          <th>Location</th>
          <th>Time</th>
          <th>Availability</th>
        </tr>
        <tr class="section-table-entry-row" v-for="section in data.Sections" :key="section">
          <td>{{section.id}}</td>
          <td>{{section.Instructor}}</td>
          <td>{{section.Room}}</td>
          <td>
            <ul class="section-table-time-cell">
              <li>{{section.Date}}</li>
              <li>{{section.Time}}</li>
            </ul>
          </td>
          <td>{{section.Availability[0]}}/{{section.Availability[1]}}</td>
        </tr>
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
  width: 580px;
  margin: 0;
}
.preview-course-code {
  text-align: start;
  font-size: 1em;
  width: 230px;
  margin: 0;
}
.preview-course-department {
  text-align: start;
  font-size: 1em;
  margin: 0;
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
  width: 450px;
  margin: 0;
  padding-right: 20px;
  border-width: 0 2px 0 0;
  border-style: solid;
  border-color: #d2d2d2;
  font-size: 0.8em;
  text-align: start;
}

.course-details {
  padding: 0 20px;
  border-width: 0 2px 0 0;
  border-style: solid;
  border-color: #d2d2d2;
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
  margin: 10px;
  /* width: 440px; */
}
.section-table-top-row {
  font-size: 1em;
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