
<script>
export default {

}
</script>
<template>
    <div class="error-404">
        <div class="error-content">
            <bold>Errore 4<i class="fa-solid fa-house-circle-exclamation fa-shake fa-2x"></i>4</bold>
            <p>Pagina non trovata</p>
        </div>
    </div>
</template>


<style scoped lang="scss">
.error-404 {
    position: relative;
    background-image: url('../img/bgc-404-4.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-shadow: 0 3px black;
    font-size: 3em;

    .error-content {
        z-index: 1;
        text-align: center;
    }

    &::before {
        content: '';
        background: rgba(0, 0, 0, 0.7);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
}
</style>
