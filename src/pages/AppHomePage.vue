<script>


export default {
    data() {
        return {
            searchCity: "",
        }
    },

    // inserire chiamata axios con il la variabile di ricerca per mostrare in pagina i risultati, mantenere in memoria la città ricercata.
}
</script>
<template>
    <AppHeader />
    <main>
        <section>
            <div class="container-fliud jumbotron">
                <img class="img-fluid" src="../../public/img/jumbo_1.jpeg" alt="jumbotron_1">
                <div class="search-bar">
                    <input v-model.trim="searchCity" type="text" class="form-control"
                        placeholder="Cerca una città o indirizzo completo">
                    <button class="btn btn-search bg-white " type="button">
                        <i class="fa-solid fa-magnifying-glass-location"></i>
                    </button>
                </div>
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
    </main>
</template>

<style lang="scss" scoped>
// JUMBOTRON 
.jumbotron {
    position: relative;

    .search-bar {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        width: 300px;
        box-shadow: 0px 0px 49px 10px rgba(37, 221, 133, 0.7);

    }

    .form-control {
        border: 0;
        font-size: 0.7rem;
        position: relative;
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

@media screen and (min-width: 576) {
    .wrapper-featured-cards {
        flex-direction: row;
        flex-wrap: wrap;
    }
}


@media screen and (min-width: 769px) {


    .wrapper-featured-cards {
        flex-direction: row;
        gap: 20px;
    }

    .jumbotron {
        .search-bar {
            width: 500px;
        }

        .form-control {
            font-size: 1rem;
            height: 30px;
        }

    }


}

@media screen and (min-width: 996px) {
    .jumbotron {
        .search-bar {
            width: 800px;

            .fa-magnifying-glass-location {
                font-size: 2rem;
            }
        }

        .form-control {
            height: 50px;
        }

        .form-control {
            font-size: 1rem;
        }
    }
}
</style>