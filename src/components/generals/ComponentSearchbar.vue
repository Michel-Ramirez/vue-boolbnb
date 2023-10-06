<script>
import axios from 'axios';
import { store } from "../../data/store";
import { router } from '../../router/index.js';
const distance = 20000
const endpoint = `http://127.0.0.1:8000/api/houses/search`
const tomtomApiKey = "key=soH7vSRFYTpCT37GOm8wEimPoDyc3GMe";

export default {
    name: "ComponentSearchbar",
    data() {
        return {
            lat: "",
            long: "",
            room_number: '',
            beds_number: '',
            distance_number: '20000',
            searchCity: '',
            services: [],
            serviceSelected: [],
            houseFiltered: [],
            store,
            searchCity: "",
            searchResults: [],
            currentIndex: "",
            isSelected: false,
            distance: "20000",
            isLoading: false,
            debouncedFetchAddress: null,
            isClicked: false,
        }
    },
    methods: {
        isSelect(id) {
            if (this.serviceSelected.includes(id)) {
                this.serviceSelected = this.serviceSelected.filter(function (item) {
                    return item != id;
                })
            } else this.serviceSelected.push(id);


        },
        buildFilterUrl() {
            const queryParams = {
                city: this.searchCity,  // Aggiungi la città all'URL
                lat: this.lat,
                long: this.long,
                distance: this.distance_number,
                total_rooms: this.room_number,
                total_beds: this.beds_number,
                service: this.serviceSelected.join(','), // Unisci gli ID dei servizi selezionati con una virgola
            };

            const queryString = Object.keys(queryParams)
                .filter(key => queryParams[key] !== '')
                .map(key => `${key} = ${encodeURIComponent(queryParams[key])}`)
                .join('&');

            return `/searchpage?${queryString}`;
        },
        sendFilter() {
            axios.get(endpoint + `?lat=${this.lat}&long=${this.long}&distance=${this.distance_number}&total_rooms=${this.room_number}&total_beds=${this.beds_number}&service=[${this.serviceSelected}]`).then((res) => {
                store.resultCards = res.data;
            })
            const filterUrl = this.buildFilterUrl();
            router.push(filterUrl);
        },
        handleSearchCityInput() {
            // Clear Timeout (if exist) to avoid multiple call
            clearTimeout(this.debouncedFetchAddress);

            // Set a new timeout of 1000 milliseconds (1 second)
            this.debouncedFetchAddress = setTimeout(() => {
                if (this.searchCity.length) {
                    this.fetchAddress();
                }
            }, 500);
        },
        fetchAddress() {
            this.searchResults = [];
            axios
                .get(
                    `https://api.tomtom.com/search/2/search/${this.searchCity}.json?limit=5&countrySet=IT&extendedPostalCodesFor=Addr&view=Unified&${tomtomApiKey}`
                )
                .then((res) => {
                    // console.log(res.data.results);
                    this.isSelected = false;
                    if (this.searchResults.length) this.searchResults = [];
                    const results = res.data.results;

                    results.forEach((result) => {
                        this.searchResults.push(result);
                    });
                })
                .catch()
                .then();
        },
        getCoordinates(targetIndex) {
            this.searchCity = this.searchResults[targetIndex].address.freeformAddress;
            this.lat = this.searchResults[targetIndex].position.lat;
            this.long = this.searchResults[targetIndex].position.lon;
            this.isSelected = true;
            store.showCards = true;

            store.isLoading = true;
            axios
                .get(
                    `http://127.0.0.1:8000/api/houses/search?lat=${this.lat}&long=${this.long}&distance=${this.distance}&service=[]`
                )
                .then((res) => {

                    store.resultCards = res.data;

                })
                .catch()
                .then(() => {
                });
            router.push({ name: 'searchpage' });
            store.isLoading = false;
            router.push({
                name: 'searchpage',
                query: { city: this.searchCity }
            });
        },
    },
    created() {
        axios.get(`http://127.0.0.1:8000/api/services`)
            .then((res) => { this.services = res.data })
    },
};
</script>

<template>
    <AppLoader v-if="store.isLoading" />
    <div class="wrapper-search d-flex">
        <div class="search-bar me-3">
            <form @keyup.prevent="handleSearchCityInput">
                <input v-model.trim="searchCity" type="text" class="form-control"
                    placeholder="Cerca una città o indirizzo completo" />
                <button class="btn btn-search bg-white" type="submit">
                    <i class="fa-solid fa-magnifying-glass-location"></i>
                </button>
            </form>
            <ul class="list-group list-group-flush" v-if="!isSelected">
                <li v-for="(result, index) in searchResults" :key="result.address.country" class="list-group-item"
                    @click="getCoordinates(index)">
                    {{ result.address.freeformAddress }}
                </li>
            </ul>
        </div>

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
                                <button @click="sendFilter()" type="button" class="btn-custom">Invia</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss">
.search-bar {
    width: 300px;
    box-shadow: 0px 0px 49px 10px rgba(37, 221, 133, 0.7);
    position: relative;

    .form-control {
        height: 40px;
        border: 0;
        font-size: 1rem;
    }

    .btn-search {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .fa-magnifying-glass-location {
            color: #25dd85;
        }
    }

    .form-control:focus {
        box-shadow: none;
        border-color: white;
    }

    .btn-search:active {
        border-color: white;
    }

    .list-group {
        border-radius: 5px;

        .list-group-item {
            cursor: pointer;

            &:hover {
                background-color: #2cdd82;
                color: white;
            }
        }
    }
}

.open-offcanvas {
    height: 40px;
}

.offcanvas.offcanvas-start {
    width: 100%;
}

.btn-custom {
    padding: 4px 15px;
    border-radius: 30px;
    color: #ffffff;
    border: 0;
    background-image: linear-gradient(to right, #97e15f, #22dd85);
    text-decoration: none;

    &:hover {
        background-image: linear-gradient(to right, #4c4c4c, #191919);
    }
}
</style>
