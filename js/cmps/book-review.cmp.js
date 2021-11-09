export default {
    props: ['review'],
    template: `
    
        <section>
            <button @click="remove(review.id)">x</button>
            <h3>{{review.name}}</h3>
             <p>{{dateFormat}}</p>
            <p>{{review.range}}</p>
            <p>{{review.text}}</p>
            </section>
       
    `,
    data() {
        return {


        }
    },
    methods: {
        remove(reviewId) {
            this.$emit('removed', reviewId)
        }
    },
    computed: {
        dateFormat() {
            return new Date(this.review.date).toLocaleDateString()
        }
    }
}