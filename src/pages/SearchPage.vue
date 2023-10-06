<script>
import { store } from '../data/store';
import Searchbar from '../components/generals/ComponentSearchbar.vue';
export default {
    name: 'SearchPage',
    components: { Searchbar },
    data() {
        return {
            store,
        };
    },
}
</script>
<template>
    <!-- <AppLoader v-if="isLoading" /> -->
    <section class="container-sm container-xxl mt-5 d-flex flex-column align-items-center">
        <div class="my-5">
            <Searchbar />
        </div>
        <div v-if="!store.resultCards.length">
            <h5 class="text-center">Siamo spiacenti non ci sono appartamenti in questa località</h5>
        </div>
        <div v-else class="row">
            <div class="col-4 sidebar">
                <h4>FILTRI</h4>
            </div>
            <div class="col-8 search-result">
                <HouseCard v-for="house in store.resultCards" :key="house.id" :house="house" />
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
// .offcanvas.offcanvas-start {
//     width: 100%;
// }

.search-result {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}
</style>