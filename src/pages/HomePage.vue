<script>
import axios from 'axios';
import ComponentSearchbar from '../components/generals/ComponentSearchbar.vue';
import { store } from '../data/store';
import 'animate.css';
const endpoint = 'http://127.0.0.1:8000/api/houses/';
export default {
    components: { ComponentSearchbar },
    data() {
        return {
            store,
            autoPlay: null,
            currentIndex: 0,
            evidenceHouses: [],
            isLoading: false,
            isSearching: true,
        }
    },
    methods: {
        gotoNext() {

            if (this.currentIndex === store.jumboCarousel.length - 1) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
        },
        startAutoplay() {
            autoPlay = setInterval(this.gotoNext, 5000);

        },
        fetchEvidenceHouses() {
            this.isLoading = true;
            axios.get(endpoint).then(res => {
                this.evidenceHouses = res.data;
                console.log(this.evidenceHouses)
            }).catch(err => {
                console.log(err);
            }).then(() => { this.isLoading = false })
        }
    },
    mounted() {
        this.fetchEvidenceHouses();
        this.autoPlay = setInterval(this.gotoNext, 5000);
    }


    // inserire chiamata axios con il la variabile di ricerca per mostrare in pagina i risultati, mantenere in memoria la città ricercata.
}
</script>
<template>
    <!-- <AppNotFound /> -->
    <AppLoader v-if="isLoading" />
    <div v-else>
        <section>
            <div class="container-fliud jumbotron">

                <figure v-for="(imgJumbo, index) in store.jumboCarousel" v-show="currentIndex === index">
                    <img class="" :src="imgJumbo" alt="jumbotron_1">
                </figure>
                <hgroup class="home-title">
                    <h3>Esplora, riposa, divertiti</h3>
                    <h1>La tua casa lontano da casa</h1>
                </hgroup>

                <ComponentSearchbar />
            </div>
        </section>
        <div v-if="!isSearching">
            <section class="featured py-5">
                <h3 class="my-5">In evidenza</h3>
                <div class="container">
                    <div class="row">
                        <div v-if="evidenceHouses.length" class="col wrapper-featured-cards">
                            <HouseCard v-for="evHouse in evidenceHouses" :key="evHouse.id" class="my-3"
                                :evHouse="evHouse" />
                        </div>
                        <h4 v-else class="text-center">Attualmente non ci sono appartamenti in evidenza</h4>
                    </div>
                </div>
            </section>
            <section class="travel py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-8">
                            <h4 class="my-5">Scegli una meta, inizia la tua esperienza</h4>
                            <p>Incomincia il tuo viaggio ora, contatta l'host del appartamento scelto al resto penseremo
                                noi.
                                Tu dovrai solo preoccuparti di divertirti e goderti il viaggio.
                            </p>
                        </div>
                        <div class="col-4">
                            <img src="../img/travel.jpg" alt="" class="img-fluid">
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <!-- risultati della ricerca -->
    </div>
</template>

<style lang="scss">
@use '../assets/scss/mediaquery' as *;

// JUMBOTRON 
.jumbotron {
    position: relative;
    height: 350px;

    figure {
        height: 100%;
    }

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        // filter: blur(2px);
    }

    .animate__animated.animate__fadeIn {
        --animate-duration: 5s;
        --animation-delay: 5s;
    }
}

.home-title {
    text-align: center;
    position: absolute;
    top: 150px;
    left: 50%;
    right: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    text-shadow: 1px 1px 2px black;
    color: white;

    h1 {
        font-size: 2rem;
    }
}

// SECTION FEATURED

.featured {
    border-radius: 10px;
    background-color: #25dd8417;
}

.featured,
.wrapper-featured-cards {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.wrapper-featured-cards {
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.travel {
    background-color: #F7F7F7;

    .row {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
    }
}
</style>