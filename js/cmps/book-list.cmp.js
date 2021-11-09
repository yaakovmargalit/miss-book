import bookPreview from "./book-preview.cmp.js"

export default {
    props: ['books'],
    template: `
    <ul class="book-list">  
        <li v-for="book in books"  class="book-preview-container">
        <router-link class="card" :to="'/book/'+book.id" >
            <book-Preview :book="book" />
            <img class="sale-img-card" v-if="book.listPrice.isOnSale" src='./../img/sale.png'/>
        </router-link>
        </li>
    </ul>
    `,
    methods: {
        select(book) {
            this.$emit('selected', book)
        }
    },
    components: {
        bookPreview
    }
}