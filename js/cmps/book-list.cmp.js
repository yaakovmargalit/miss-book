import bookPreview from "./book-preview.cmp.js"
import BookAdd from "./BookAdd.cmp.js"
export default {
    props: ['books'],
    template: `
    <div>
       <book-add @addedBook="add"></book-add>
        <ul class="book-list">  
            <li v-for="book in books"  class="book-preview-container">
                <router-link class="card" :to="'/book/'+book.id" >
                    <book-Preview :book="book" />
                    <img class="sale-img-card" v-if="book.listPrice.isOnSale" src='./../img/sale.png'/>
                </router-link>
            </li>
        </ul>
</div>
    `,
    methods: {
        select(book) {
            this.$emit('selected', book)
        },
        add(book) {
            this.books.push(book)
        }
    },
    components: {
        bookPreview,
        BookAdd
    }
}