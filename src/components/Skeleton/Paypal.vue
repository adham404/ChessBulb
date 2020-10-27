


<template>
  <div>
    <div v-if="!paidFor">
      <h1>Buy this Lamp - ${{ product.price }} OBO</h1>

      <p>{{ product.description }}</p>

      <img width="400" src="https://images-na.ssl-images-amazon.com/images/I/61yZD4-mKjL._SX425_.jpg" />
    </div>

    <div v-if="paidFor">
      <h1>Noice, you bought a beautiful lamp!</h1>

      <img src="https://media.giphy.com/media/j5QcmXoFWl4Q0/giphy.gif">
    </div>

    <div ref="paypal"></div>
  </div>
</template>

<script>
// import image from "../assets/lamp.png"
export default {
  name: "HelloWorld",

  data: function() {
    return {
      loaded: false,
      paidFor: false,
      product: {
        price: 777.77,
        description: "leg lamp from that one movie",
        img: "./assets/lamp.jpg"
      }
    };
  },
  mounted: function() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AaxUTpLkl06QcRkjZv4xT1Wa10bsipqSl01juIT65_fg8epA9TQjjE6_SP4qMAts3XTknqeqFqEfzDSJ";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
                shipping_type: 'PICKUP',
      application_context: { shipping_preference: 'NO_SHIPPING' },
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "USD",
                    value: this.product.price
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();

            this.data;

            this.paidFor = true;

            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
