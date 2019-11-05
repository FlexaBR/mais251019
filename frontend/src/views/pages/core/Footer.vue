<template>
  <footer class="pages-footer">
    <div
      class="caption font-weight-light"
    >Flexa©2019</div>
  </footer>
</template>

<script>
export default {
  name: 'PagesFooter'
}
</script>

<style>
.pages-footer {
  grid-area: footer;
  background-color: #ddd;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}
</style>
