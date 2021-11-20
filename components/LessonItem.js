import html from "html";

export default {
  name: `LessonItem`,
  template: html`
    <div class="col-md-4 col-lg-3 col-sm-6 mb-4">
      <div class="rounded-3 shadow-lg p-3 bg-white">
        <div class="row">
          <div class="col-xl-8 col-md-12 col-sm-7">
            <div>
              <small>
                <span class="fw-bold">Subject: </span>{{ lesson.subject }}
              </small>
            </div>
            <div>
              <small>
                <span class="fw-bold">Location: </span>{{ lesson.location }}
              </small>
            </div>
            <div>
              <small>
                <span class="fw-bold">Price: </span>£ {{ lesson.price }}
              </small>
            </div>
            <div>
              <small v-if="isAddToCart">
                <span class="fw-bold">Spaces: </span>{{ lesson.space }}
              </small>
              <small v-else>
                <span class="fw-bold">Spaces: </span>{{ lesson.num }}
              </small>
            </div>
          </div>
          <div class="col-xl-4 col-md-12 col-sm-5 p-4 p-sm-0 p-md-4 p-xl-0">
            <img :src="lesson.image" class="w-100" />
          </div>
        </div>
        <div v-if="isAddToCart">
          <button
            v-if="lesson.space > 0"
            v-on:click="addToCart(lesson.id)"
            class="btn btn-primary mt-4 form-control"
          >
            Add to Cart
          </button>
          <button v-else class="btn btn-primary mt-4 form-control" disabled>
            Add to Cart
          </button>
        </div>
        <button
          v-else
          v-on:click="removeCart(lesson.id)"
          class="btn btn-danger mt-4 form-control"
        >
          Remove
        </button>
      </div>
    </div>
  `,
  props: ["lesson", "isAddToCart"],
  methods: {
    addToCart: function (id) {
      this.$emit("addtocart", id);
    },
    removeCart: function (id) {
      this.$emit("removeCart", id);
    },
  },
};
