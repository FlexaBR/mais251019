<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'Content'
}

// no style: classe content / na área do content um espaçamento (padding) de 20 para não
// colar no header, footer ou parte lateral do conteudo.
</script>

<style>
    .content {
        grid-area: content;
        background-color: #efefef;
        padding: 20px;
    }
</style>
