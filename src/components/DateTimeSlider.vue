<template>
  <div class="DateTimeSlider">
    <div class="first-row">
      <div class="display-time">
        <h3 class="time-text">
          {{ reformatTimeNormal(value.Time[0]) }} -
          {{ reformatTimeNormal(value.Time[1]) }}
        </h3>
      </div>
      <img
        src="../assets/Icons/close.svg"
        class="remove-btn"
        @click="emitRemove()"
      />
    </div>
    <div class="second-row">
      <div class="time-slider">
        <ejs-slider
          id="range"
          :min="minVal"
          :max="maxVal"
          v-model="value.Time"
          type="Range"
        ></ejs-slider>
      </div>
      <div class="date-select">
        <select v-model="value.Day">
          <option v-for="(date, index) in dates" :key="index" :value="date">
            {{ date }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
// https://ej2.syncfusion.com/vue/documentation/slider/getting-started/?no-cache=1
import Vue from "vue";
import { SliderPlugin } from "@syncfusion/ej2-vue-inputs";
Vue.use(SliderPlugin);

export default {
  name: "DateTimeSlider",
  props: {
    value: Object,
  },
  data: function() {
    return {
      minVal: "0",
      maxVal: "24",
      dates: ["MTWRF", "M W F", "T R", "M", "T", "W", "R", "F"],
    };
  },
  methods: {
    emitRemove: function() {
      this.$emit("remove");
    },
    reformatTimeNormal: function(time) {
      var hour = Math.floor(time % 12);
      hour = hour == 0 ? 12 : hour;
      var minute = time - Math.floor(time);
      minute = Math.round(minute * 60);
      minute = minute < 10 ? "0" + minute : minute;
      var am_pm = time < 12 ? "am" : "pm";
      return hour + ":" + minute + " " + am_pm;
    },
  },
};
</script>

<style scoped>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";
.DateTimeSlider {
  min-height: max-content;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #dadada;
  margin: 5px 0;
  width: -webkit-fill-available;
}
.DateTimeSlider > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.display-time {
  border: 2px solid #b3b1d8;
  border-radius: 6px;
  padding: 1px 3px;
  width: 9em;
}
.display-time .time-text {
  font-size: 0.9em;
  color: #001d45;
  text-decoration: none;
  margin: 0;
}
.remove-btn {
  height: 13px;
  width: 13px;
  cursor: pointer;
}
.time-slider {
  flex: 1;
  margin: 0 10px;
}
.date-select select {
  padding: 2px 25px 2px 5px;
  font-size: 0.7em;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  border-radius: 6px;
  border: 2px solid #b3b1d8;
  height: 34px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("../assets/Icons/down-arrow.svg") 90% / 18% no-repeat;
}
#range .e-handle {
  background-color: #71c5e8;
  border-radius: 50%;
  border: 0;
}
</style>
