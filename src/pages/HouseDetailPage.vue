<script>
import axios from 'axios';
export default {
    data() {
        return {
            houseData: [],
            isLoading: false,
        };
    },
    methods: {
        fetchData() {
            this.isLoading = true;
            const endpoint = 'http://127.0.0.1:8000/api/houses/';
            const houseId = this.$route.params.id;
            axios.get(endpoint + houseId).then((res) => {
                this.houseData.push(res.data);
                console.log(this.houseData)
            }).catch().then(() => { this.isLoading = false; });
        }
    },
    created() {
        this.fetchData();
    },
}
</script>
<template>
    <section>
        <AppLoader v-if="isLoading" />
        <div v-else>
            <div class="container house-detail my-5" v-for="house in houseData" :key="house.id">
                <h1>{{ house.name }}</h1>
                <div>
                    <img :src="house.photo" :alt="house.name">
                </div>
                <div class="row">
                    <div class="col-xl-8">
                        <div>
                            <h5>{{ house.address.home_address }}</h5>
                        </div>
                        <div>
                            <span>Stanze: {{ house.total_rooms }}</span> |
                            <span>Letti: {{ house.total_beds }}</span> |
                            <span>Bagni: {{ house.total_bath }}</span>
                        </div>
                        <div class="host-section">
                            <h6 class="py-4">Nome dell'host: {{ house.user.name }} {{ house.user.surname }}</h6>
                        </div>
                    </div>
                    <div class="col-xl-4">
                        <h1>pronota</h1>
                    </div>
                </div>
            </div>
            <div class="reservation" v-for="house in houseData" :key="house.id">
                <div class="d-flex justify-content-between m-3">
                    <div class="price"><strong>{{ house.night_price }} €</strong>/notte</div>
                    <button type="button" class="btn btn-custom">Prenota</button>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.host-section {
    margin: 20px 0;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
}

.col-xl-4 {
    display: none;
}

.price {
    font-size: 1.3rem;
}

.reservation {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
}
</style>