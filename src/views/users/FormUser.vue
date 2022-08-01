<template>
  <div class="product-form ">
    <h3 class="text-xl my-3">User Information</h3>
    <router-link to="/user">Back</router-link>
    <form @submit.prevent="save()">
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label"
          >User Name</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="user.name"
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
          User Email
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="user.email"
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
          >User Password</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="user.password"
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
        <button type="submit"  class="btn btn-outline-primary mr-1">Save</button>
        <button type="reset" @click="cancelProduct()" class="btn btn-outline-danger ml-1">Cancel</button>
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
        email: "",
        password: "",
      },
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  created() {
    let pId = this.$route.params;
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
      if (!this.user.name) {
        this.errors.name = "user name is required";
        isValid = false;
      }

      if (!this.user.price) {
        this.errors.price = "user price is required";
      } else if (!this.isNumber(this.user.price)) {
        this.errors.price = "user price is number";
        isValid = false;
      }
      if (!this.user.description) {
        this.errors.description = "user description is required";
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
          .put(`http://localhost:8000/api/users/${this.$route.params.id}`, this.user)
          .then((res) => {
            // console.log(res.data);
            if (res.data.success) {
              this.$router.push({ name: "user.list" });
              return
            }
            alert("heh, errors guys!");
          });
            return;
          }

        axios
          .post("http://localhost:8000/api/users", this.user)
          .then((res) => {
            // console.log(res.data);
            if (res.data.success) {  
              this.$router.push({ name: "user.list" });
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
        .get(`http://localhost:8000/api/users/${productId}`)
        .then((res) => {
          this.user = res.data;
          console.log(this.user);                
         
        });
    },
    cancelProduct() {
      this.user = {
        name: "",
        email: "",
        password: "",
      }
    }
  },
};
</script>
