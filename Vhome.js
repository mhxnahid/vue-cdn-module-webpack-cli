//import * as moment from 'moment'

const home = {
    data(){
        return {
            time: ''
        }
    },
    template: `<div>This is the home page
        <div>Today is {{time}}</div>
    </div>`
}

export default home;