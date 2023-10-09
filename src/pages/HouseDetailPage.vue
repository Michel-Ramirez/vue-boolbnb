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
            <div class="house-detail container my-5" v-for="house in  houseData " :key="house.id">
                <h1 class="my-5">{{ house.type }} | {{ house.name }}</h1>
                <div>
                    <img :src="house.photo" :alt="house.name" class="img-fluid">
                </div>
                <div class="row my-4">
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
                        <div class="house-description">
                            <p>
                                {{ house.description }}
                            </p>
                        </div>
                        <div class="house-composition pb-5">
                            <h5 class="py-5">Composizione dell'alloggio</h5>
                            <div class="row">
                                <div class="col-12 wrapper-composition-cards ">
                                    <div class="card p-3 d-flex align-items-center">
                                        <i class="fa-solid fa-house fa-xl my-3" style="color: #24bb83"></i>
                                        <div class="card-title">
                                            <p>
                                                <strong>Alloggio</strong>
                                            </p>
                                            <p class="text-center"><strong>{{ house.mq }} mq</strong></p>
                                        </div>
                                    </div>
                                    <div class="card p-3 d-flex align-items-center ">
                                        <i class="fa-solid fa-bed fa-xl my-3" style="color: #24bb83"></i>
                                        <div class="card-title">
                                            <p>
                                                <strong>Camere da letto</strong>
                                            </p>
                                            <p class="text-center"><strong>{{ house.total_rooms }}</strong></p>
                                        </div>
                                    </div>
                                    <div class="card p-3 d-flex align-items-center ">
                                        <i class="fa-solid fa-mattress-pillow fa-rotate-90 fa-xl my-3"
                                            style="color: #24bb83"></i>
                                        <div class="card-title">
                                            <p>
                                                <strong>Letti</strong>
                                            </p>
                                            <p class="text-center"><strong>{{ house.total_beds }}</strong></p>
                                        </div>
                                    </div>
                                    <div class="card p-3 d-flex align-items-center ">
                                        <i class="fa-solid fa-toilet fa-xl my-3" style="color: #24bb83"></i>
                                        <div class="card-title">
                                            <p>
                                                <strong>Bagni</strong>
                                            </p>
                                            <p class="text-center"><strong>{{ house.total_bath }}</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="house-services py-5">
                            <h5 class="pb-4">Servizzi dell'alloggio</h5>
                            <div class="row">
                                <div v-for="service in  house.services " class="col ">
                                    <div>
                                        <i :class="service.icon" class="fa-xl my-3" style="color: #24bb83"></i>
                                        <p>{{ service.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4">
                        <div class="card">
                            <div class="card-title">
                                <div>
                                    <div class="price mb-3"><strong>{{ house.night_price }} €</strong>/notte</div>
                                    <h5 class="text-center my-3 ">Invia un messaggio al host per maggiori informazioni</h5>
                                    <form class="d-flex flex-column align-items-center ">
                                        <div class="container mb-3">
                                            <div class="row">
                                                <div class="col-6">
                                                    <label for="name_reservation" class="form-label">Nome</label>
                                                    <input type="text" class="form-control" id="name_reservation">
                                                </div>
                                                <div class="col-6">
                                                    <label for="surname_reservation" class="form-label">Cognome</label>
                                                    <input type="text" class="form-control" id="surname_reservation">
                                                </div>
                                            </div>
                                            <div class="row my-3">
                                                <div class="col-12">
                                                    <label for="email_reservation" class="form-label">Email</label>
                                                    <input type="email" class="form-control" id="email_reservation">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="mb-3">
                                                        <label for="detail_reservation" class="form-label">Messaggio</label>
                                                        <textarea class="form-control" id="detail_reservation"
                                                            rows="3"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-custom">Contatta</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="reservation" v-for=" house  in  houseData " :key="house.id">
                <div class="d-flex justify-content-between m-3">
                    <div class="price"><strong>{{ house.night_price }} €</strong>/notte</div>
                    <button type="button" class="btn btn-custom">Contatta</button>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.house-detail {
    img {
        border-radius: 10px;
    }
}

.house-composition {
    .card {
        width: 180px;
    }

    .card-title {
        margin-bottom: 0;
    }

    .wrapper-composition-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }
}

.col-xl-8 {

    .house-description,
    .host-section,
    .house-services,
    .house-composition {
        border-bottom: 1px solid lightgray;
    }

    .host-section {
        border-top: 1px solid lightgray;
        margin-top: 30px;
    }

    .house-description {
        padding: 30px 0;
    }

}

.col-xl-4 {
    display: none;

    .card {
        max-width: 450px;
        padding: 30px;

        #detail_reservation {
            min-height: 200px;
        }

    }

    .btn-custom {
        padding: 10px 100px;
        font-size: 1.5rem;
    }
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