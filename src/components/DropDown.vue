<template>
  <div
    :class="['Drop-down-comp',{'collapsed':collapsed}]"
    :style="expandStyle"
    @click="toggleCollapse()"
  >
    <div class="drop-down-vis">
      <h1 class="title">{{ title }}</h1>
      <img src />
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  data: function () {
    return {
      //   title: "General Education Req",
      slotHeight: 0,
      collapsed: true,
    };
  },
  computed: {
    expandStyle: function () {
      return {
        "--height": 80 + this.slotHeight + "px",
      };
    },
  },
  methods: {
    toggleCollapse: function () {
      this.collapsed = !this.collapsed;
    },
  },
  mounted: function () {
    this.slotHeight = this.$el.getElementsByClassName(
      "content"
    )[0].clientHeight;
    console.log(
      "slot height",
      this.$el.getElementsByClassName("content")[0].clientHeight
    );
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap");
.Drop-down-comp {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 20px;
  margin: 10px 10px;
  background-color: #fff;
  border: 1px solid #d2d2d2;
  border-radius: 15px;
  height: var(--height);
  color: #001d45;
  transition: border 0.4s, background-color 0.4s, color 0.4s, height 0.4s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}
.Drop-down-comp.collapsed {
  background-color: #e83d12;
  height: 60px;
  border-color: #0000;
  color: #fff;
  transition: border 0.4s, background-color 0.4s, color 0.4s height 0.4s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}
.drop-down-vis {
  display: flex;
  align-content: center;
  justify-content: space-between;
  height: 60px;
}
.drop-down-vis .title {
  font-family: "Oswald", sans-serif;
  font-weight: 600;
  font-size: 1.2em;
  color: inherit;
}
</style>