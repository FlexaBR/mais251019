<template>
  <div
    id="home"
  >
    <jumbotron />
    <get-app />
    <fabricas />
    <v-container
      id="testimonials"
      class="py-5 black--text"
      tag="section"
    >
      <heading>Testemunho</heading>
      <v-row>
        <v-col
          v-for="(testimonial, i) in testimonials"
          :key="i"
          cols="12"
          md="6"
        >
          <testimonial :testimonial="testimonial" />
        </v-col>
      </v-row>
    </v-container>
    <contato />
  </div>
</template>

<script>
  import Contato from '../../components/home/Contato'
  import Fabricas from '../../components/home/Fabricas'
  import GetApp from '../../components/home/GetApp'
  import Heading from '../../components/comum/Heading'
  import Jumbotron from '../../components/home/Jumbotron'
  import Testimonial from '../../components/home/Testimonial'

  export default {
    name: 'Home',
    components: {
      Contato,
      Fabricas,
      GetApp,
      Heading,
      Jumbotron,
      Testimonial
    },
    data: () => ({
      testimonials: [
        {
          blurb:
            'Para atingirmos os melhores resultados, comprar certo é fundamental. Precisamos acertar na escolha dos produtos, cores, quantidades e preços. Sucesso em nosso departamento significa giro de vendas, produtos que não param nas prateleiras, e para isso, a assessoria da Mais Representações é indispensável. Compramos sempre na medida certa para nossos melhores resultados.',
          person: 'Nancy Swanson',
          title: 'Diretora de Compras, Cia Zaffari S.A.',
        },
        {
          blurb:
            'Desde que começamos o trabalho com a Mais nosso departamento de lyngerie teve um crescimento de 200%! A definição do mix de produtos e preços com a parceria MaisRep ajudou muito.',
          person: 'André Schraiber',
          title: 'Gerente de Compras, Lojas Pompéia',
        },
      ],
    }),
  }
</script>
