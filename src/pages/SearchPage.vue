<script>
import axios from 'axios';
import { store } from '../data/store';
import { router } from '../router/index';
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
            room_number: '',
            beds_number: '',
            services: [],
            serviceSelected: [],
            distance_number: '20000',
        };
    },
    methods: {
        isSelect(id) {
            if (this.serviceSelected.includes(id)) {
                this.serviceSelected = this.serviceSelected.filter(function (item) {
                    return item != id;
                })
            } else this.serviceSelected.push(id);
        },
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
    },
    created() {
        this.getCardsFiltered();
        this.getSearchResult();
        this.isLoading = false;
        axios.get(`http://127.0.0.1:8000/api/services`)
            .then((res) => { this.services = res.data })
    }

}
</script>
<template>
    <AppLoader v-if="isLoading" />
    <section class="container-sm container-xxl mt-5 d-flex flex-column align-items-center">
        <div class="my-5 d-flex ">
            <Searchbar />
            <!-- BUTTON ACTIVATE OFFCANVAS -->
            <button class="btn btn-light open-offcanvas" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                <i class="fa-solid fa-sliders"></i>
            </button>
        </div>

        <!-- OFFCANVAS -->

        <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop"
            aria-labelledby="staticBackdropLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title mt-5" id="staticBackdropLabel">
                    Filtri
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <form>
                    <div class="row">
                        <div class="col-5">
                            <div class="mb-3">
                                <label for="room_number_id" class="form-label">Stanze:</label>
                                <input v-model="room_number" type="number" class="form-control" id="room_number_id">


                            </div>
                        </div>
                        <div class="col-5">
                            <div class="mb-3">
                                <label for="beds_number_id" class="form-label">Posti letto:</label>
                                <input v-model="beds_number" type="number" class="form-control" id="beds_number_id">


                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-7">
                            <div class="mb-3">
                                <label for="distance_number_id" class="form-label">Distanza in metri dal indirizzo
                                    ricercato</label>
                                <input v-model="distance_number" type="number" class="form-control" id="distance_number_id">



                            </div>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="row me-5">
                            <div class="col">
                                <h6>Servizi della stanza</h6>
                                <div class="form-check" v-for="service in services" :key="service.id">
                                    <input @click="isSelect(service.id)" class="form-check-input" type="checkbox">
                                    <label class="form-check-label"><i :class="service.icon"></i> {{
                                        service.name }}
                                    </label>


                                </div>
                                <div class="d-flex justify-content-end">
                                    <button data-bs-dismiss="offcanvas" @click="getCardsFiltered()" type="button"
                                        class="btn-custom">Invia</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
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