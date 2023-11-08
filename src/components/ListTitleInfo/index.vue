<template>
  <div class="title-container">
    <i class="title-block" />
    <h3>{{ title }}</h3>
    <div class="title-container-slot">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.title-container {
  width:100%;
  display: flex;
  padding: 16px 0;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #F1F4F8;
  align-items:center;
  margin-bottom: 8px;
  .title-block {
    // visibility: hidden;
    display:none;
    width: 4px;
    margin-right: 8px;
    background: #409eff;
  }
  h3 {
    margin: 0;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    height:24px;
  }
  .title-container-slot{
    flex: 1;
  }
}
</style>
