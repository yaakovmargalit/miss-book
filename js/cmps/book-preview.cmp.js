import bookAuthors from "./book-authors.cmp.js";

export default {
    props: ['book'],
    template: `
    <section class="book-preview">
        <h4>{{book.title}}</h4>
        <book-authors :authors="book.authors"/>
        <img class="book-img" :src= 'book.thumbnail'/>
        <h4 :class="priceStyle">{{book.listPrice.amount}}{{currencyIcon}}</h4>
    </section>
    `,
    data() {
        return {
            symbol: this.book.listPrice.currencyCode
        }
    },
    computed: {
        currencyIcon() {
            var currency_symbols = {
                'USD': '$', // US Dollar
                'EUR': '€', // Euro
                'ILS': '₪' // Israeli New Sheqel
            };
            return currency_symbols[this.symbol]
        },
        priceStyle() {
            return { red: this.book.listPrice.amount > 150, green: this.book.listPrice.amount < 20 }
        }
    },
    components: {
        bookAuthors
    }
}