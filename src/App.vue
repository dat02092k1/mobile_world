<script setup> 
  import { useProductStore } from './store/index';
  import Navbar from './components/Navbar.vue';
  const store = useProductStore();
</script>
<template>
  <div>
    <h1>{{store.name}}</h1>
    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-white mb-3">
      <a class="navbar-brand" href="#"><router-link to="/home">Vue Mini Project</router-link></a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul class="navbar-nav">
          
          <li class="nav-item">
            <a class="nav-link" href="#"><router-link to="/product">Product Management</router-link></a>
            
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><router-link to="/user">User Management</router-link></a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Admin
            </a>
            
          </li>
        </ul>
      </div>
    </nav> -->
    <Navbar />
     
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}


</style>
