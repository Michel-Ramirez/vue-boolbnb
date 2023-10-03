<script>
export default {
    data() {
        return {
            searchResult: [],
        }
    }
}
</script>
<template>
    <section class="container-sm container-xxl ">
        <div class="row">
            <div class="col-4 sidebar">
                <h4>FILTRI</h4>
            </div>
            <div class="col-8 search-result">
                <h2>CARDS</h2>
                <HouseCard v-if="searchResult.length" />
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.offcanvas.offcanvas-start {
    width: 100%;
}
</style>