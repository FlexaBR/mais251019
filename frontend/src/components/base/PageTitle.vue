<template>
  <div class="page-title ml-2">
    <h2 class="font-weight-light">
      <i v-if="icon" :class="icon"></i>
      {{ main }}
    </h2>
    <h3 class="font-weight-light ml-6">{{ sub }}</h3>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: ['icon', 'main', 'sub']
}
</script>

<style>
.page-title {
  margin-top: -2px;
  margin-bottom: 2px;
}
.page-title h2 {
  margin: 0px;
  font-size: 1.1rem;
}

.page-title h3 {
  color: #777;
  margin-top: 0px;
  margin-bottom: 1px;
  font-size: 0.9rem;
}
</style>
