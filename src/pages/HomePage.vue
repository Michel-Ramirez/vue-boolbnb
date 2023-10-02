<script>
import ComponentSearbar from '../components/generals/ComponentSearbar.vue';

export default {
    components: { ComponentSearbar },
    data() {
        return {
        }
    },

    // inserire chiamata axios con il la variabile di ricerca per mostrare in pagina i risultati, mantenere in memoria la città ricercata.
}
</script>
<template>
    <!-- <AppNotFound /> -->

    <section>
        <div class="container-fliud jumbotron">
            <img class="img-fluid" src="../../public/img/jumbo_1.jpeg" alt="jumbotron_1">
            <ComponentSearbar />
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
            </div>
        </div>

    </section>
</template>

<style lang="scss">
@use '../assets/scss/mediaquery' as *;

// JUMBOTRON 
.jumbotron {
    position: relative;
    height: 700px;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

}

// SECTION FEATURED

.featured {

    margin: 50px 20px;
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