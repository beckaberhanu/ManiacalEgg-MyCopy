<template>
  <div class="classListing">
    <div class="top-section"></div>
    <div class="bottom-section">
      <div class="descriptio-and-sections">
        <div class="description-and-sections">
          <p></p>
          <div class="sections"></div>
        </div>
      </div>
      <div class="course-details"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ClassListing",
  date() {
    return {
      Title: "Core Concept of Computer Science",
      classCode: "COMP 123",
      department: "Computer Science",
      DistributionReq: "Natural Science and Mathematics",
      GeneralEd: ["Quantitative Thinking Q3"],
      Description: "",
      Sections: {
        "COMP 123-01": {
          Instructor: "Jessica Love-Nichols"
        }
      }
    };
  }
};
</script>
<style scoped>
</style>