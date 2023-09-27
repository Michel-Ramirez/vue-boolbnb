<script>
export default {

}
</script>

<template>
    <header class="d-flex justify-content-between align-items-center container-xxl my-2">
        <div class="img-container">
            <a href="/"><img class="img-fluid" src="../../public/img/logo_navbar.png" alt=""></a>
        </div>
        <div class="">
            <!-- icona per il login o sing in   -->
            <div class="user-icon dropdown ">
                <button class="user btn dropdown-toggle no-caret" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class=" fa-regular fa-circle-user"></i>
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
    </header>
</template>

<style lang="scss" scoped>
header {
    height: 70px;

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

        padding: 0px 15px;
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



@media screen and (min-width: 769px) {
    header .user-icon {
        display: none;
    }

    header .log-button {
        display: flex;
        gap: 10px;
    }
}
</style>