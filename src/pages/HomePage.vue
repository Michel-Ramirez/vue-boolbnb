<script>
import ComponentSearchbar from '../components/generals/ComponentSearchbar.vue';
import { store } from '../data/store';
export default {
    components: { ComponentSearchbar },
    data() {
        return {
            store,
            autoPlay: null,
            currentIndex: 0,
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
            autoPlay = setInterval(this.gotoNext, 2000);

        },
    },
    mounted() {
        this.autoPlay = setInterval(this.gotoNext, 2000);
    }


    // inserire chiamata axios con il la variabile di ricerca per mostrare in pagina i risultati, mantenere in memoria la città ricercata.
}
</script>
<template>
    <!-- <AppNotFound /> -->

    <section>
        <div class="container-fliud jumbotron">
            <figure v-for="(imgJumbo, index) in store.jumboCarousel" v-show="currentIndex === index">
                <img class="img-fluid" :src="imgJumbo" alt="jumbotron_1">
            </figure>
            <ComponentSearchbar />
        </div>
    </section>
    <section class="featured">
        <h3 class="my-3">In evidenza</h3>
        <div class="container">
            <div class="row">
                <div class="col wrapper-featured-cards">
                    <HouseCard class="my-3" />
                    <HouseCard class="my-3" />
                    <HouseCard class="my-3" />
                </div>
                <div class="col wrapper-featured-cards">
                    <HouseCard class="my-3" />
                    <HouseCard class="my-3" />
                    <HouseCard class="my-3" />
                </div>
            </div>
        </div>

    </section>
</template>

<style lang="scss">
@use '../assets/scss/mediaquery' as *;

// JUMBOTRON 
.jumbotron {
    position: relative;
    height: 800px;

    figure {
        height: 100%;
    }

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        // filter: blur(2px);
    }

}

// SECTION FEATURED

.featured {

    margin: 50px 0;
    border-radius: 10px;
    background-color: #25dd8417;


}

.featured,
.wrapper-featured-cards {
    display: flex;
    align-items: center;
    flex-direction: column;

}
</style>