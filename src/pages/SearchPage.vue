<script>
import axios from "axios";
import { store } from "../data/store";
import { router } from "../router/index";
import Searchbar from "../components/generals/ComponentSearchbar.vue";
import { resolveTransitionHooks } from "vue";
export default {
    name: "SearchPage",
    components: { Searchbar },
    watch: {
        $route(to, from) {
            // Gestisci qui i cambiamenti dell'URL

            if (to.fullPath !== from.fullPath) {
                this.getCardsFiltered();

            }
        },
    },
    data() {
        return {
            store,
            isLoading: false,
            distance_default_meter: "20000",
            room_number: "",
            beds_number: "",
            distance_km: "20",
            serviceSelected: [],
            services: [],
            lat: "",
            long: "",
            address: "",
        };
    },
    methods: {
        reset() {
            this.distance_km = "20";
            this.room_number = "";
            this.beds_number = "";
            this.serviceSelected = [];
        },
        isSelect(id) {
            if (this.serviceSelected.includes(id)) {
                this.serviceSelected = this.serviceSelected.filter(function (item) {
                    return item != id;
                });
            } else this.serviceSelected.push(id);
        },
        getCardsFiltered() {
            this.isLoading = true;
            const endpoint = `http://127.0.0.1:8000/api/houses/search`;
            this.address = this.$route.query.address;
            this.lat = this.$route.query.lat;
            this.long = this.$route.query.long;

            // TRASFORMO IL INPUT DEL UTENTE DA KM IN METRI
            const distance_meters = parseFloat(this.distance_km) * 1000;

            axios
                .get(
                    endpoint +
                    `?lat=${this.lat}&long=${this.long}&distance=${distance_meters}&total_rooms=${this.room_number}&total_beds=${this.beds_number}&service=[${this.serviceSelected}]`
                )
                .then((res) => {
                    store.resultCards = [];
                    res.data.forEach(house => {
                        if (house.sponsors.length) {
                            store.resultCards.push(house)
                        }
                    });
                    res.data.forEach(house => {
                        if (!house.sponsors.length) {
                            store.resultCards.push(house)
                        }
                    });
                    // store.resultCards = res.data;

                    router.push({
                        name: "searchpage",
                        query: {
                            address: this.address,
                            lat: this.lat,
                            long: this.long,
                            distance: distance_meters,
                            total_rooms: this.room_number,
                            total_beds: this.beds_number,
                            service: this.serviceSelected.join(","),
                        },
                    });
                })
                .catch((err) => {
                    console.error(err);
                }).then(() => {
                    this.isLoading = false;
                });;
        },
    },
    created() {
        this.getCardsFiltered();
        axios.get(`http://127.0.0.1:8000/api/services`).then((res) => {
            this.services = res.data;
        });
    },
};
</script>
<template>
    <AppLoader v-if="isLoading" />
    <section v-else class="container-sm container-xxl d-flex flex-column align-items-center mb-5">
        <div class="jumbo-search">
            <h1 class="mb-5 text-center">
                Cerca la tua destinazione, incomincia il tuo viaggio
            </h1>
            <div class="d-flex align-items-center">
                <Searchbar :address="address" />
                <!-- BUTTON ACTIVATE OFFCANVAS -->
                <button class="btn btn-light open-offcanvas" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                    <i class="fa-solid fa-sliders"></i>
                </button>
            </div>
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
                                <input v-model="room_number" type="number" class="form-control" id="room_number_id" />
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="mb-3">
                                <label for="beds_number_id" class="form-label">Posti letto:</label>
                                <input v-model="beds_number" type="number" class="form-control" id="beds_number_id" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-7">
                            <div class="mb-3">
                                <label for="distance_number_id" class="form-label">Distanza in metri dal indirizzo
                                    ricercato</label>
                                <input v-model="distance_km" type="number" class="form-control" id="distance_number_id" />
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="row me-5">
                            <div class="col">
                                <h6>Servizi della stanza</h6>
                                <div class="form-check" v-for="service in services" :key="service.id">
                                    <input @click="isSelect(service.id)" class="form-check-input" type="checkbox"
                                        :id="service.id" />
                                    <label class="form-check-label" :for="service.id"><i :class="service.icon"></i> {{
                                        service.name }}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center my-5">
                            <button @click="reset()" type="button" class="btn-custom me-3">
                                Reset
                            </button>
                            <button data-bs-dismiss="offcanvas" @click="getCardsFiltered()" type="button"
                                class="btn-custom">
                                Invia
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- RESULT IN SEARCH PAGE -->

        <div class="wrapper-result">
            <h2 v-if="store.resultCards.length" class="my-5 text-center">
                Ecco cosa abbiamo trovato in {{ this.address }}
            </h2>
            <div class="row">
                <!-- SIDEBRA FILTRI -->
                <div class="col-4 sidebar">
                    <h4>AFFINA LA TUA RICERCA</h4>
                    <form>
                        <div class="row">
                            <div class="col-5">
                                <div class="mb-3">
                                    <label for="room_number_id" class="form-label">Stanze:</label>
                                    <input v-model="room_number" type="number" class="form-control" id="room_number_id" />
                                </div>
                            </div>
                            <div class="col-5">
                                <div class="mb-3">
                                    <label for="beds_number_id" class="form-label">Posti letto:</label>
                                    <input v-model="beds_number" type="number" class="form-control" id="beds_number_id" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-7">
                                <div class="mb-3">
                                    <label for="distance_number_id" class="form-label">Distanza in Km dal indirizzo
                                        ricercato</label>
                                    <input v-model="distance_km" type="number" class="form-control"
                                        id="distance_number_id" />
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="row me-5">
                                <div class="col">
                                    <h6>Servizi della stanza</h6>
                                    <div class="form-check" v-for="service in services" :key="service.id">
                                        <input @click="isSelect(service.id)" class="form-check-input" type="checkbox"
                                            :id="'side-' + service.id" />
                                        <label class="form-check-label" :for="'side-' + service.id"><i
                                                :class="service.icon"></i> {{ service.name }}
                                        </label>
                                    </div>
                                    <div class="d-flex justify-content-end my-5">
                                        <button @click="reset()" type="button" class="btn-custom me-3">
                                            Reset
                                        </button>
                                        <button @click="getCardsFiltered()" type="button" class="btn-custom">
                                            Invia
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-12 col-lg-8 search-result" :class="{ 'justify-content-center': !store.resultCards.length }">
                    <div v-if="!store.resultCards.length"
                        class="d-flex flex-column align-items-center justify-content-center">
                        <i class="fa-solid fa-house-circle-xmark fa-shake fa-2xl mb-5" style="color: red"></i>
                        <h5 class="text-center">
                            Siamo spiacenti non abbiamo trovato quello che cercavi
                        </h5>
                    </div>
                    <HouseCard v-for="house in store.resultCards" :key="house.id" :house="house" />
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.container-sm {
    .jumbo-search {
        height: 350px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}

.wrapper-result {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.sidebar {
    display: none;
}

.search-result {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}
</style>
