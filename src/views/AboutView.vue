<template>
  <div class="about-pizzeria">
    <div class="about-content">
      <img
        class="about-img"
        src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80"
        alt="Pizza deliciosa"
      />
      <div class="text-section">
        <h1>¡Bienvenido a <span>Trabajo final de pizzeria </span>!</h1>
        <p>
          Somos una pizzería artesanal en el corazón de la ciudad, donde cada pizza es una obra de amor y tradición. 
          Usamos ingredientes frescos, mezclamos recetas italianas con nuestro toque especial y horneamos cada masa 
          con dedicación. ¡Nuestra pasión es que vivas la mejor experiencia de pizza en el cecep.
        </p>
        <div class="highlight">
          <strong>Desde 2025:</strong> Trayendo alegría a cada mesa. 
          <span>🍕❤️</span>
        </div>
      </div>
    </div>
  </div>
</template>
&nbsp;
&nbsp;

<style scoped>
.about-pizzeria {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(120deg, #fae5d3 0%, #fffbea 100%);
  padding: 2rem;
}
.about-content {
  background: #fffaf5;
  border-radius: 2rem;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
  margin-top: 4rem;
}
.about-img {
  width: 340px;
  height: 340px;
  object-fit: cover;
  border-radius: 2rem 0 0 2rem;
  box-shadow: 4px 0 12px rgba(253,179,52,0.18);
  background: #fbb034;
}
.text-section {
  flex: 1;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h1 {
  color: #b13d15;
  font-family: 'Poppins', sans-serif;
  font-size: 2.1rem;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
}
h1 span {
  color: #fbb034;
  font-family: 'Pacifico', cursive;
}
p {
  color: #7a5433;
  font-size: 1.13rem;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}
.highlight {
  background: #fbb0341a;
  padding: 0.9rem 1.2rem;
  border-radius: 1rem;
  font-size: 1.08rem;
  color: #b13d15;
  font-weight: 600;
  display: inline-block;
  letter-spacing: 0.5px;
}
@media (max-width: 700px) {
  .about-content {
    flex-direction: column;
    align-items: center;
  }
  .about-img {
    border-radius: 2rem 2rem 0 0;
    width: 100%;
    height: 210px;
    margin-bottom: 1rem;
  }
  .text-section {
    padding: 1rem;
  }
}
</style>

