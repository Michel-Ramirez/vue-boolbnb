<script>


export default {
    data() {
        return {
            searchCity: "",
        }
    },
}
</script>
<template>
    <AppHeader />
    <section>
        <div class="container-fliud jumbotron">
            <img class="img-fluid" src="../../public/img/jumbo_1.jpeg" alt="jumbotron_1">
            <div class="search-bar">
                <input v-model="searchCity" type="text" class="form-control" placeholder="Cerca un città">
                <button class="btn btn-search bg-white " type="button">
                    <i class="fa-solid fa-magnifying-glass-location" style="color: #25dd85;"></i>
                </button>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.jumbotron {
    position: relative;

    .search-bar {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        width: 300px;
    }

    .form-control {
        border: 0;
        font-size: 0.8rem;
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
    }

    .form-control:focus {
        box-shadow: none;
        border-color: white;
    }

    .btn-search:active {
        border-color: white;
    }
}
</style>