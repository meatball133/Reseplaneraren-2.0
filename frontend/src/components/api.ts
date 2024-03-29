export async function api(options: any, setRoutes: any) {
    console.log(options)
    const response = await fetch('http://127.0.0.1:4000/api/vastraffik', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
    });

    let data = await response.json()

    setRoutes(data)
}

export async function detailedPageApi(detailsReference: string, setRoute: any) {
    const response = await fetch('http://127.0.0.1:4000/api/vastraffik/route', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ detailsReference })
    });

    let data = await response.json()

    setRoute(data)
}

export async function loadMoreRoutes(options: any, type : string , setRoute: any) {
    const response = await fetch('http://127.0.0.1:4000/api/vastraffik/more_routes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
    });

    let data = await response.json()

    if (type === "previous") {
        setRoute((prevRoute: any) => {
            const updatedResults = [...data["results"], ...prevRoute.results];
            return { ...prevRoute, results: updatedResults };
        })
    } else {

    setRoute((prevRoute: any) => {
        const updatedResults = [...prevRoute.results, ...data["results"]];
        return { ...prevRoute, results: updatedResults };
    })
    }
}

export async function getStops(name: String, setStops: any) {
    const response = await fetch('http://127.0.0.1:4000/api/vastraffik/get_location' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })

    let data = await response.json()
    console.log(data)
    if (data["results"]) {
    setStops(data["results"].map((stop: any) => {return {label: stop["name"], value: stop["gid"] }}))
                            
    }
}
