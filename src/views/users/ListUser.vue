<!-- <template>
  <div class="product-list">
    <div class="pricing-header">
      <h2>Product Management</h2>
      <router-link to="/product/create">Add New</router-link>
    </div>
    <div class="table-list text-center">
      <table class="table ml-auto mr-auto">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(product, index) of products">
            <th scope="row">{{ product.id }}</th>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.description }}</td>
            <td>
              <button class="btn-edit btn-primary mr-2">Edit</button>
              <button
                class="btn-delete btn-danger ml-2"
                @click="deleteProduct(product.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProductList",
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      axios.get("http://localhost:8000/api/products").then((res) => {
        //console.log(res.data);
        this.products = res.data;
      });
    },
    deleteProduct(productId) {
      this.$swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Oke",       
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            axios.delete(`http://localhost:8000/api/products/${productId}`)    
            .then(res => {
              if(res.data.success) {
                this.$swal.fire('Deleted!', '', 'success')
                this.getProducts();
              }
            })      
        }})
    },
    createProduct() {
      
    }
  },
};
</script> -->
<template>
  <div class="product-list">
    <div class="pricing-header">
      <h2 class="text-xl my-3">User Management</h2>
      <router-link to="/user/create">Add New</router-link>
    </div>
    <div class="table-list text-center">
      <table class="table ml-auto mr-auto">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(user, index) of getDataUsers.users">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.password }}</td>
            <td>
              <router-link :to="{ name: 'user.create', params: { id: user.id}}">
              <button 
              class="btn-edit btn-primary mr-2 p-2"
              @click="getDetails(user.id)">
              Edit</button>
              </router-link>
              
              <button
                class="btn-delete btn-danger ml-2 p-2"
                @click="deleteUser(user.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";

const getDataUsers = reactive({
  users: [],
});

onMounted(() => {
  getUsers();
});

function getUsers() {
  axios.get("http://localhost:8000/api/users").then((res) => {
    getDataUsers.users = res.data;
    //console.log(getDataProducts.products);
  });
}


function deleteUser(productId) {
          $swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Oke",       
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            axios.delete(`http://localhost:8000/api/users/${productId}`)    
            .then(res => {
              if(res.data.success) {
                $swal.fire('Deleted!', '', 'success')
                getProducts();
              }
            })      
        }})
    }

 
</script>

