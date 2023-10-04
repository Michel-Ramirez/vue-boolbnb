import { reactive } from "vue";

export const store = reactive({
  jumboCarousel: [
    "../../public/img/jumbo_1.jpeg",
    "../../public/img/jumbo_2.jpeg",
    "../../public/img/jumbo_3.jpg",
    "../../public/img/jumbo_4.jpg",
  ],
  isSearching: false,
  resultCards: null,
  showCards: false,
});
