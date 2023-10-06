<script>
import axios from 'axios';
import { store } from '../../data/store';
export default {
    data() {
        return {
            store,
            city: '', // Variabile per memorizzare la città dai parametri dell'URL
        };
    },
    created() {
        // Ottieni la città dai parametri dell'URL
        this.city = this.$route.query.city;

        // Esegui la chiamata API per caricare i dati in base ai parametri dell'URL
        this.loadDataFromApi();
    },
    methods: {
        loadDataFromApi() {
            // Esegui le chiamate API necessarie utilizzando i parametri dall'URL (city, lat, long, ecc.)
            // Ad esempio:
            axios.get(`URL_API?city=${this.city}&lat=${this.$route.query.lat}&long=${this.$route.query.long}&distance=${this.$route.query.distance}&total_rooms=${this.$route.query.total_rooms}&total_beds=${this.$route.query.total_beds}&service=${this.$route.query.service}`)
                .then((res) => {
                    // Aggiungi i dati ricevuti dal server alla variabile store.resultCards
                    store.resultCards = res.data;
                })
                .catch((error) => {
                    console.error('Errore durante la chiamata API:', error);
                });
        }
    }
}
</script>
<template>
    <section class="container-sm container-xxl mt-5">
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
.offcanvas.offcanvas-start {
    width: 100%;
}

.search-result {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}
</style>