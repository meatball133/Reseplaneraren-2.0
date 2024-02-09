export async function api(setRoutes : any) {
    const response = await fetch('http://127.0.0.1:4000/api/vastraffik', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orginName: 'Budskär', destinationName: 'Chalmers' })
    });

    let data = await response.json()

    setRoutes(data)
}
