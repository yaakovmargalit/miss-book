export default {
    template: `
    <section class="review-add">
        <form >
            <input  v-model="review.name" type="text" placeholder="Name...">
            <input  v-model="review.range" type="range" min="1" max="5">
            {{review.range}}
            <input  v-model="review.date" type="date">
            <textarea  v-model="review.text" placeholder="Write down what you think of the book...">
            </textarea>
            <button @click.prevent="addReview">Add</button>
        </form>
    </section>
    `,
    data() {
        return {
            review: {
                name: 'Books Reader',
                range: 1,
                date: new Date().toLocaleDateString(),
                text: ''
            }
        }
    },
    methods: {
        addReview() {
            this.$emit('added', {...this.review })
        }
    }
}