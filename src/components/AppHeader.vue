<script>
export default {

}
</script>

<template>
    <header class="d-flex align-items-center">
        <div class="container-xxl d-flex justify-content-between align-items-center">
            <div class="img-container d-flex align-items-center">
                <a href="/"><img class="img-fluid" src="../../public/img/logo_navbar.png" alt=""></a>
                <p class="ps-3 pt-3"><a href="/"
                        class="link-secondary link-offset-2 link-underline link-underline-opacity-0 link-opacity-50-hover"><strong>Home</strong></a>
                </p>
            </div>
            <div class="pe-3 action-button-group">
                <!-- icona per il login o sing in   -->
                <div class="user-icon dropdown ">
                    <button class="user btn dropdown-toggle no-caret" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class=" fa-solid fa-circle-user"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Accedi</a></li>
                        <li><a class="dropdown-item" href="#">Registrati</a></li>
                    </ul>
                </div>
                <!-- bottone per il login e sing in -->
                <div class="log-button">
                    <a class="btn-custom" href="">Accedi</a>
                    <a class="btn-custom" href="">Registrati</a>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@import "../assets/scss/mediaquery";

header {
    height: 70px;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: 50px 0;
    background-color: white;
    box-shadow: 0px 10px 10px 2px rgba(0, 0, 0, 0.5);

    .img-container {
        height: 70px;
    }

    div {


        a {
            display: block;
            height: 100%;


            img {
                height: 100%;
            }
        }

        i {
            color: #191919;
            margin: 3px auto;
            font-size: 30px;
            background-image: linear-gradient(to right, #97E15F, #22dd85);
            border-radius: 50%;
        }

        .user {
            height: 100%;
            border-color: black;
        }
    }

    .user-icon {
        &:hover {
            i {
                color: #22dd85;
                background-image: linear-gradient(to right, #4C4C4C, #191919);
                cursor: pointer;
            }
        }

        .dropdown-toggle {
            border-width: 0px;
            padding: 0;
        }
    }

    .log-button {
        display: none;
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
}

.no-caret::after {
    display: none;
}
</style>