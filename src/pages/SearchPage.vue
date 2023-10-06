<script>
import axios from 'axios';
import { store } from '../data/store';
import { useRouter } from 'vue-router';
import Searchbar from '../components/generals/ComponentSearchbar.vue';
export default {
    name: 'SearchPage',
    components: { Searchbar },
    data() {
        return {
            store,
            distance: "",
            isLoading: true,
        };
    },
    methods: {
        getSearchResult() {
            store.address = this.$route.query.address;
            store.lat = this.$route.query.lat;
            store.long = this.$route.query.long;
            this.distance = this.$route.query.distance;
            axios
                .get(`http://127.0.0.1:8000/api/houses/search?lat=${store.lat}&long=${store.long}&distance=${this.distance}&service=[]`)
                .then((res) => {
                    store.resultCards = res.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        getCardsFiltered() {
            const endpoint = `http://127.0.0.1:8000/api/houses/search`;
            store.address = this.$route.query.address;
            store.lat = this.$route.query.lat;
            store.long = this.$route.query.long;
            const { distance_number, room_number, beds_number, serviceSelected } = this.$route.query

            if (!store.filter) {
                axios.get(endpoint + `?lat=${store.lat}&long=${store.long}&distance=${this.distance_number}&total_rooms=${this.room_number}&total_beds=${this.beds_number}&service=[${this.serviceSelected}]`).then((res) => {
                    store.resultCards = res.data;


                    router.push({ name: 'searchpage' });

                    router.push({
                        name: 'searchpage',
                        query: {
                            address: store.address,
                            lat: store.lat,
                            long: store.long,
                            distance: this.distance_number,
                            total_rooms: this.room_number,
                            total_beds: this.beds_number,
                            service: this.serviceSelected.join(',')
                        }
                    });
                });
            }
        }
    },
    created() {
        this.getSearchResult();
        this.isLoading = false;
    }

}
</script>
<template>
    <AppLoader v-if="isLoading" />
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
.search-result {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}
</style>