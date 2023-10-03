<script>
export default {
    name: 'ComponentSearchbar',
    data() {
        return {
            searchCity: "",
        }
    }
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
            <form action="">
                <div class="row">
                    <div class="col-5">
                        <div class="mb-3">
                            <label for="room_number_id" class="form-label">Stanze:</label>
                            <input type="number" class="form-control" id="room_number_id">
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="mb-3">
                            <label for="beds_number_id" class="form-label">Posti letto:</label>
                            <input type="number" class="form-control" id="beds_number_id">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="mb-3">
                            <label for="distance_number_id" class="form-label">Distanza in km dal indirizzo
                                ricercato</label>
                            <input type="number" class="form-control" id="distance_number_id">
                        </div>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="row me-5 ">
                        <div class="col">
                            <h6>Servizi della stanza</h6>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="wifi-check">
                                <label class="form-check-label" for="wifi-check">
                                    Wifi
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="tv-check">
                                <label class="form-check-label" for="tv-check">
                                    TV
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="air-condition-check">
                                <label class="form-check-label" for="air-condition-check">
                                    Aria Condizionata
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="double-bed-check">
                                <label class="form-check-label" for="double-bed-check">
                                    Letto matrimoniale grande
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="fire-place-check">
                                <label class="form-check-label" for="fire-place-check">
                                    Camino
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="dryer-check">
                                <label class="form-check-label" for="dryer-check">
                                    Asciugacapelli
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="washer-check">
                                <label class="form-check-label" for="washer-check">
                                    Lavatrice
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="kitchen-check">
                                <label class="form-check-label" for="kitchen-check">
                                    Cucina
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h6>Servizi della struttura</h6>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="breakfast-check">
                                <label class="form-check-label" for="breakfast-check">
                                    Colazione
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="parking-check">
                                <label class="form-check-label" for="parking-check">
                                    Posto auto
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="swimingpool-check">
                                <label class="form-check-label" for="swimingpool-check">
                                    Piscina
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="sauna-check">
                                <label class="form-check-label" for="sauna-check">
                                    Sauna
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="gym-check">
                                <label class="form-check-label" for="gym-check">
                                    Palestra
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="seafront-check">
                                <label class="form-check-label" for="seafront-check">
                                    Lungo il mare
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="animal-permissing-check">
                                <label class="form-check-label" for="animal-permissing-check">
                                    Animale domesrtici ammessi
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <a class="btn-custom " href="">Invia</a>
                </div>
            </form>
        </div>
        <div>
        </div>
        <div class="container">
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