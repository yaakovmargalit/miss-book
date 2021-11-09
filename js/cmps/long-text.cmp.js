export default {
    props: ['txt'],
    template: `
    <div>
    <p>{{textForDisplay}} <span v-if="!expandText && isLongTxt">...</span></p>
    <button v-if="isLongTxt" @click="toggleText">{{textButton}}</button>
    
</div>
    `,
    data() {
        return {
            expandText: false,
            textBtn: ''
        }
    },
    methods: {
        toggleText() {
            this.expandText = !this.expandText
        }
    },
    computed: {
        textForDisplay() {
            console.log(this.txt)
            return this.expandText ? this.txt : this.txt.slice(0, 100)
        },
        textButton() {
            return this.expandText ? 'less' : 'more'
        },
        isLongTxt() {
            return this.txt.length > 100
        }
    }

}