const home = {
    data(){
        return {
            time: moment().format('dddd')
        }
    },
    template: `<div>This is the home page
        <div>Today is {{time}}</div>
    </div>`
}

export default home;