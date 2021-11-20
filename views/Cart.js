import html from "html";
import Lessons from "../components/Lessons.js";
import Navbar from "../components/Navbar.js";

export default {
  template: html` <Navbar v-bind:carts="carts" />
    <div class="row mt-4 container-fluid">
      <Lessons
        v-bind:lessons="carts"
        v-bind:isAddToCart="false"
        v-on:removeCart="removeCart"
      />
      <div v-if="carts.length > 0" class="col-md-3 col-lg-2">
        <form v-on:submit="checkout">
          <div class="form-group mb-2">
            <label>Name</label>
            <input
              v-model="name"
              v-on:keyup="checkName"
              type="text"
              class="form-control"
            />
            <span v-if="errors.name" class="text-danger">{{errors.name}}</span>
          </div>
          <div class="form-group mb-4">
            <label>Phone Number</label>
            <input
              v-model="phone"
              v-on:keyup="checkPhone"
              type="text"
              class="form-control"
            />
            <span v-if="errors.phone" class="text-danger"
              >{{errors.phone}}</span
            >
          </div>
          <button
            v-if="!errors.name && !errors.phone && name && phone"
            type="submit"
            class="btn btn-primary form-control"
          >
            Checkout
          </button>
        </form>
      </div>
    </div>`,
  data: function () {
    return {
      carts: [],
      errors: {
        name: "",
        phone: "",
      },
      name: "",
      phone: "",
    };
  },
  components: {
    Lessons,
    Navbar,
  },
  mounted: function () {
    let cartsList = localStorage.getItem("carts");
    this.carts = cartsList ? JSON.parse(cartsList) : [];
  },
  methods: {
    removeCart: function (id) {
      let cartsList = this.carts;
      cartsList.forEach((cart) => {
        if (cart.id == id && cart.num > 0) cart.num--;
      });
      cartsList = cartsList.filter((cart) => cart.num > 0);
      localStorage.setItem("carts", JSON.stringify(cartsList));
      this.carts = cartsList;
      if (cartsList.length == 0) this.$router.push("/");
    },
    checkName: function () {
      if (!this.name) {
        this.errors.name = "Name is required";
      } else {
        if (!!/([^a-zA-Z\s])/.test(this.name))
          this.errors.name = "Only letters are required";
        else this.errors.name = "";
      }
    },
    checkPhone: function () {
      if (!this.phone) {
        this.errors.phone = "Phone Number is required";
      } else {
        if (!!/([^0-9])/.test(this.phone))
          this.errors.phone = "Only numbers are required";
        else this.errors.phone = "";
      }
    },
    checkout: function (e) {
      e.preventDefault();
      if (!this.errors.name && !this.errors.phone && this.name && this.phone) {
        alert("Orders have been submitted!");
        localStorage.removeItem("carts");
        this.carts = [];
        this.$router.push("/");
      }
    },
  },
};
