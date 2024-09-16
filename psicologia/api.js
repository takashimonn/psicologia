const API = 'http://192.168.1.16:3000/citas'

export const getCitas = async () => {
    const res = await fetch(API)
    return await res.json()

}