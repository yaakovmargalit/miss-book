import longText from "../cmps/long-text.cmp.js";
import reviewAdd from "../cmps/review-add.cmp.js";
import bookReview from "../cmps/book-review.cmp.js";
import { bookService } from '../services/book-service.js';
import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
    <div v-if="currBook" class="book-details">
      <div class="flex">
           <div>
                <img class="sale-img" v-if="currBook.listPrice.isOnSale" src='./../img/sale.png'/>
                <!-- <button class="close-btn" @click="$emit('close')" >X</button> -->
                <h1>{{currBook.title}}</h1>
                <img class="book-img" :src= 'currBook.thumbnail'/>
                <h3>{{pageCountForShow}}</h3>
                <h3>{{publishedDateForShow}}</h3>
            </div>
            <ul class="flex review-box">
                 <li v-for="review in currBook.reviews">
                      <book-review @removed="removeReview(currBook.id,$event)" :review="review" />
                 </li>
            </ul>
        </div>
        <hr/>
        <long-text class="desc" :txt="currBook.description"/>
        <review-add @added="addReview"/>
    </div>
    `,
    data() {
        return {
            currBook: null
        }
    },
    created() {
        this.loadBook()
    },
    methods: {
        loadBook() {
            const { bookId } = this.$route.params;
            bookService.getById(bookId)
                .then(book => {
                    this.currBook = book
                })
        },
        addReview(review) {
            bookService.addReview(this.currBook.id, review)
                .then(() => {
                    const msg = {
                        txt: 'Added succesfully',
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                    this.loadBook()
                })

        },
        removeReview(bookId, reviewId) {
            bookService.removeReview(bookId, reviewId)
                .then(() => {
                    const msg = {
                        txt: 'Removed succesfully',
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                    this.loadBook()
                })
        }
    },
    computed: {
        pageCountForShow() {
            if (this.currBook.pageCount < 100) return ' - - - Light Reading - - - '
            if (this.currBook.pageCount > 200 && this.pageCount < 500) return 'Decent Reading'
            if (this.currBook.pageCount > 500) return ' - - - Long reading - - - '
            return ''
        },
        publishedDateForShow() {
            if ((new Date().getFullYear() - this.currBook.publishedDate) > 10) return ' - - - Veteran Book - - - '
            if ((new Date().getFullYear() - this.currBook.publishedDate) < 1) return 'New!'

        }
    },
    components: {
        longText,
        reviewAdd,
        bookReview
    }
}