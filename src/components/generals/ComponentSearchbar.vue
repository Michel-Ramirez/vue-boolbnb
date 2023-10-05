<script>
import axios from 'axios';
const lat = 41.902800
const long = 12.4964000
const distance = 20000
const endpoint = `http://127.0.0.1:8000/api/houses/search`

export default {
    name: 'ComponentSearchbar',
    data() {
        return {
            room_number: '',
            beds_number: '',
            distance_number: '',
            searchCity: '',
            services: [],
            serviceSelected: [],
            houseFiltered: [],
        }
    },
    created() {
        axios.get(`http://127.0.0.1:8000/api/services`)
            .then((res) => { this.services = res.data })
    },
    methods: {
        isSelected(id) {
            this.serviceSelected.push(id);

        },
        sendFilter() {
            axios.get(endpoint + `?lat=${lat}&long=${long}&distance=${distance}&total_rooms=${this.room_number}&total_beds=${this.beds_number}&service=[${this.serviceSelected}]`).then((res) => {
                this.houseFiltered = res.data;
            })
        },

    },
}
</script>

<template>
    <div class="wrapper-search d-flex">
        <div class="search-bar me-3">
            <input v-model.trim="searchCity" type="text" class="form-control"
                placeholder="Cerca una città o indirizzo completo">
            <button class="btn btn-search bg-white " type="button">
                <i class="fa-solid fa-magnifying-glass-location"></i>
            </button>
        </div>

        <button class="btn btn-light open-offcanvas" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
            <i class="fa-solid fa-sliders"></i>
        </button>
    </div>

    <!-- OFFCANVAS -->

    <!-- !!! TODO rimuovere show -->

    <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop"
        aria-labelledby="staticBackdropLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title mt-5" id="staticBackdropLabel">Filtri</h5>
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
                            <label for="distance_number_id" class="form-label">Distanza in km dal indirizzo
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
                                <input @click="isSelected(service.id)" class="form-check-input" type="checkbox">
                                <label class="form-check-label"><i :class="service.icon"></i> {{
                                    service.name }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <button @click="sendFilter()" type="button" class="btn-custom">Invia</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss">
.wrapper-search {
    position: absolute;
    top: 70%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);

}

.search-bar {
    width: 300px;
    box-shadow: 0px 0px 49px 10px rgba(37, 221, 133, 0.7);
    position: relative;

    .form-control {
        height: 100%;
        border: 0;
        font-size: 0.7rem;
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
}

.offcanvas.offcanvas-start {
    width: 100%;
}

.btn-custom {

    padding: 4px 15px;
    border-radius: 30px;
    color: #ffffff;
    border: 0;
    background-image: linear-gradient(to right, #97E15F, #22dd85);
    text-decoration: none;

    &:hover {
        background-image: linear-gradient(to right, #4C4C4C, #191919);
    }
}
</style>