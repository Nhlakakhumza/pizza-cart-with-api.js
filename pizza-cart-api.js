document.addEventListener('alpine:init', () => {

    //alert("Alpine loaded...")

    Alpine.data('pizzaCartWithAPIWidget', function () {
        return {
            init() {
                //alert('Pizza cart loading...')
                // calling the API to get all the Pizzas
                //set this.pizzas

                axios
                    .get('https://pizza-cart-api.herokuapp.com/api/pizzas')
                    .then((result) => {
                        this.pizzas = result.data.pizzas

                    })
                    .then(() => {
                        return this.createCart();
                    })
                    .then((result) => {

                        //console.log(result.data);

                        this.cartId = result.data.cart_code;
                    });


            },
            createCart() {
                ///api/pizza-cart/create
                return axios.get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username)
            },
            showCart() {
                const url = `https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartId}/get`;

                axios
                .get(url)
                .then((result) => {
                    this.cart = result.data;
                });
            },



            message: 'Eating pizzas',
            username: 'Ceejay',
            pizzas: [],
            cartId: '',
            cart : { total : 0 },

            add(pizza) {
                // to be able to add a pizza to the cart i need cart Id.

                const params = {
                    cart_code: this.cartId,
                    pizza_id: pizza.id
                }

                axios
                    .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
                    .then(() =>  {
                        
                        this.message = "Pizza added to the cart"
                        this.showCart();
                    })
                    .catch (err => alert(err) );


                //alert(pizza.id)
            }



        }
    });

})
