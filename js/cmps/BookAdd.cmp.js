import { bookService } from "../services/book-service.js"

export default {
    template: `
        <section class="google">
            <form @submit="getGoogleBooks">
                <input class="google-input"  v-model="searchTxt" type="text">
                <button type="submit">Search</button>
            </form>
            <ul class="google-list" v-if="results">
                <li v-for="title in this.titlesLIst">
                    <h4>{{title.title}}</h4>
                    <button @click="addGoogleBook(title.id)">➕</button>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            searchTxt: null,
            results: null
        }
    },
    methods: {
        getGoogleBooks() {
            console.log(this.searchTxt)
            if (!localStorage.getItem('google-books')) {
                axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${this.searchTxt}`)
                    .then(res => {
                        localStorage.setItem('google-books', JSON.stringify(res.data.items))
                        this.results = res.data.items;
                    })
                    .catch(() => {
                        console.log("on the face with the ghabot!!!")
                    })
            } else {
                this.results = JSON.parse(localStorage.getItem('google-books'))
                console.log(this.results);
            }
        },
        addGoogleBook(id) {
            var book = this.results.find(book => book.id === id)
            book = bookService.add(book)
            this.results = null
            this.$emit('addedBook', book)
        }
    },
    computed: {
        titlesLIst() {
            return this.results.map(item => {
                return {
                    title: item.volumeInfo.title,
                    id: item.id
                }
            })
        }

    }
}