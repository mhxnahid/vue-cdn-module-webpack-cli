const HOST_URL = 'socket-test.soundsip.com'//'127.0.0.1'
const HOST_PORT = ''//':8000'
const URL = `http://${HOST_URL}`
const WS_AUTH_URL = `${URL}${HOST_PORT}/broadcasting/auth`
const API_URL = `${URL}${HOST_PORT}/api/`

const variables = {
    HOST_URL, URL, WS_AUTH_URL, API_URL,
}

export default variables;