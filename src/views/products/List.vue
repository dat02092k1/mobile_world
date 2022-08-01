<template>
  <div class="product-list">
    <div class="pricing-header">
      <h2 class="text-xl my-3">Product Management</h2>
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
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(product, index) of getDataProducts.products">
            <th scope="row">{{ product.id }}</th>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.description }}</td>
            <td>
              <router-link
                :to="{ name: 'product.edit', params: { id: product.id } }"
              >
                <button
                  class="btn-edit btn-primary mr-2 p-2"
                  @click="getDetails(product.id)"
                >
                  Edit
                </button>
              </router-link>

              <button
                class="btn-delete btn-danger ml-2 p-2"
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

<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";

const getDataProducts = reactive({
  products: [],
});

onMounted(() => {
  getProducts();
});

function getProducts() {
  axios.get("http://localhost:8000/api/products").then((res) => {
    getDataProducts.products = res.data;
    //console.log(getDataProducts.products);
  });
}

// function deleteProduct(productId) {
//   console.log(productId);
//   axios.delete(`http://localhost:8000/api/products/${productId}`).then((res) => {
//     getDataProducts.products.splice(productId, 0);
//     //getUsers();
//     //console.log(this.$routes.params);
//   });
// }

function deleteProduct(productId) {
  $swal
    .fire({
      title: "Do you want to save the changes?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Oke",
    })
    .then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/products/${productId}`)
          .then((res) => {
            if (res.data.success) {
              $swal.fire("Deleted!", "", "success");
              getProducts();
            }
          });
      }
    });
}
</script>
