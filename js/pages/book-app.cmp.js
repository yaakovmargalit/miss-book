import { bookService } from './../services/book-service.js'
import bookFilter from './../cmps/book-filter.cmp.js'
import bookDetails from './../pages/book-details.cmp.js'
import bookList from './../cmps/book-list.cmp.js'

export default {
    template: `
    <section  class="book-app">
            <book-filter @filtered="setFilter"></book-filter> 
            <book-list v-if="books" :books="booksToShow" @selected="selectBook"></book-list> 
            <book-details v-if="selectedBook" :book="selectedBook" @close="closeDetails"></book-details> 
    </section>

    `,
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBook: null
        }
    },
    created() {
        this.loadBooks()
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books);
        },
        selectBook(book) {
            this.selectedBook = book
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        closeDetails() {
            this.selectedBook = null
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            console.log(this.filterBy)
            const searchStr = this.filterBy.title.toLowerCase();
            const booksToShow = this.books.filter(book => {
                return book.title.toLowerCase().includes(searchStr) &&
                    book.listPrice.amount >= this.filterBy.fromPrice &&
                    book.listPrice.amount <= this.filterBy.toPrice;
            });
            return booksToShow;
        }

    },
    components: {
        bookFilter,
        bookDetails,
        bookList
    }
}