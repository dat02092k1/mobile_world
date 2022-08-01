<template>
  <div class="product-form">
    <h3 class="text-xl my-3">Product Information</h3>
    <router-link to="/product">Back</router-link>
    <form @submit.prevent="save()">
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label"
          >Product Name</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="product.name"
            @blur="validate()"
            v-bind:class="{ 'is-invalid': errors.name }"
            id="inputName"
          />
          <div class="invalid-feedback" v-if="errors.name">
            {{ errors.name }}
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">
          Product Price
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="product.price"
            @blur="validate()"
            v-bind:class="{ 'is-invalid': errors.price }"
            id="inputPrice"
          />
          <div class="invalid-feedback" v-if="errors.price">
            {{ errors.price }}
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label"
          >Product Description</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="product.description"
            @blur="validate()"
            v-bind:class="{ 'is-invalid': errors.description }"
            id="inputDescription"
          />
          <div class="invalid-feedback" v-if="errors.description">
            {{ errors.description }}
          </div>
        </div>
      </div>
      <div class="btn">
        <button type="submit" class="btn btn-outline-primary mr-1">Save</button>
        <button
          type="reset"
          @click="cancelProduct()"
          class="btn btn-outline-danger ml-1"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import VueAxios from "vue-axios";
import axios from "axios";
import { isValid } from "ipaddr.js";
import router from "@/router";

export default {
  name: "ProductForm",
  data() {
    return {
      errors: {
        name: "",
        price: "",
        description: "",
      },
      product: {
        name: "",
        price: "",
        description: "",
      },
    };
  },
  created() {
    let pId = this.$route.params.id;
    console.log(pId);
    if (pId) {
      this.getDetails(pId);
    }
  },
  methods: {
    validate() {
      isValid = true;

      this.errors = {
        name: "",
        price: "",
        description: "",
      };
      if (!this.product.name) {
        this.errors.name = "Product name is required";
        isValid = false;
      }

      if (!this.product.price) {
        this.errors.price = "Product price is required";
      } else if (!this.isNumber(this.product.price)) {
        this.errors.price = "Product price is number";
        isValid = false;
      }
      if (!this.product.description) {
        this.errors.description = "Product description is required";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },

    save() {
      //console.log("as");
      if (this.validate()) {
        if (this.$route.params.id) {
          axios
            .put(
              `http://localhost:8000/api/products/${this.$route.params.id}`,
              this.product
            )
            .then((res) => {
              // console.log(res.data);
              if (res.data.success) {
                this.$router.push({ name: "product.list" });
                return;
              }
              alert("heh, errors guys!");
            });
          return;
        }

        axios
          .post("http://localhost:8000/api/products", this.product)
          .then((res) => {
            // console.log(res.data);
            if (res.data.success) {
              this.$router.push({ name: "product.list" });
              return;
            }
            alert("heh, errors guys!");
          });
      }
      //console.log(this.validate());
    },
    getDetails(productId) {
      //console.log(this.$route);
      axios
        .get(`http://localhost:8000/api/products/${productId}`)
        .then((res) => {
          this.product = res.data;
          console.log(this.product);
        });
    },
    cancelProduct() {
      this.product = {
        name: "",
        price: "",
        description: "",
      };
    },
  },
};
</script>
