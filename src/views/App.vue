<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <!-- Branches -->
    <router-link to="/branches">Sucursales</router-link> |

    <!-- Suppliers -->
    <router-link to="/suppliers">Proveedores</router-link> |

    <!-- Raw Materials -->
    <router-link to="/raw-materials">Materias Primas</router-link> |

    <!-- Purchases -->
    <router-link to="/purchases">Compras</router-link> |

    <!-- Pizza Raw Material -->
    <router-link to="/pizza-raw-material">Pizza Materia Prima</router-link> |

    <!-- Order Extra Ingredient -->
    <router-link to="/order-extra-ingredient">Pedido Ingrediente Extra</router-link> |
  </nav>
  <router-view/>
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

nav a.router-link-exact-active {
  color: #42b983;
}
</style>