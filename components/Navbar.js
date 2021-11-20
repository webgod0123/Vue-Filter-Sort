import html from "html";

export default {
  name: `Navbar`,
  template: html`
    <nav class="navbar navbar-dark bg-primary shadow-sm">
      <div class="container-fluid justify-content-start">
        <router-link class="navbar-brand" to="/">Web App 1</router-link>
        <router-link v-if="carts.length > 0" class="navbar-brand" to="/cart"
          >Cart</router-link
        >
      </div>
    </nav>
  `,
  props: ["carts"],
};
