const API = 'http://172.20.102.159:3000/citas'

export const getCitas = async () => {
    const res = await fetch(API)
    return await res.json()

}

export const saveCita  = async (newCita) => {
    const res = await fetch (API, {
        method: "POST",
        headers: {Accept: "aplication/json", "Content-Type": "application/json"},
        body: JSON.stringify(newCita)
    }); 
    return await res.json();
}