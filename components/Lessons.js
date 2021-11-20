import html from "html";
import LessonItem from "./LessonItem.js";

export default {
  name: `Lessons`,
  template: html`
    <div class="col-md-9 col-lg-10">
      <div class="row">
        <lesson-item
          v-if="lessons.length > 0"
          v-for="(lesson, index) in lessons"
          v-bind:key="index"
          v-bind:lesson="lesson"
          v-on:addtocart="addToCart"
          v-on:removeCart="removeCart"
          v-bind:isAddToCart="isAddToCart"
        />
        <div class="text-danger" v-else>
          <h5 v-if="isAddToCart">No lessons</h5>
          <h5 v-else>No orders to checkout</h5>
        </div>
      </div>
    </div>
  `,
  props: ["lessons", "isAddToCart"],
  components: {
    LessonItem,
  },
  methods: {
    addToCart: function (id) {
      this.$emit("addtocart", id);
    },
    removeCart: function (id) {
      this.$emit("removeCart", id);
    },
  },
};
