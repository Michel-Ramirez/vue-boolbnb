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
            lat: "",
            long: "",
            distance: "",
            isLoading: true,
        };
    },
    methods: {
        getSearchResult() {
            this.lat = this.$route.query.lat;
            this.long = this.$route.query.long;
            this.distance = this.$route.query.distance;
            axios
                .get(`http://127.0.0.1:8000/api/houses/search?lat=${this.lat}&long=${this.long}&distance=${this.distance}&service=[]`)
                .then((res) => {
                    store.resultCards = res.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        sendFilter() {
            // Richiama getSearchResult per assicurarti che i dati siano aggiornati
            this.getSearchResult();

            // Ora puoi utilizzare this.lat e this.long nella tua richiesta Axios
            axios.get(endpoint + `?lat=${this.lat}&long=${this.long}&distance=${this.distance_number}&total_rooms=${this.room_number}&total_beds=${this.beds_number}&service=[${this.serviceSelected}]`).then((res) => {
                store.resultCards = res.data;

                // Aggiungi i parametri desiderati all'URL e naviga alla pagina di ricerca
                const router = useRouter();
                router.push({
                    name: 'searchpage',
                    query: {
                        city: this.searchCity,
                        lat: this.lat,
                        long: this.long,
                        distance: this.distance_number,
                        total_rooms: this.room_number,
                        total_beds: this.beds_number,
                        service: this.serviceSelected.join(',')
                    }
                });
            });
        },
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