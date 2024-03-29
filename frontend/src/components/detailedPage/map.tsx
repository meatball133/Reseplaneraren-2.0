import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { IconCircleDot } from '@tabler/icons-react';
import L from 'leaflet'
import { LatLngExpression } from 'leaflet'


export function Map(tripLegs: any) {
  console.log(tripLegs)
  let legs = []
  let vectors = []
  if (tripLegs.triplegs) {
    legs = tripLegs.triplegs.map((leg: any) => {
      const color = leg["serviceJourneys"][0]["line"]["foregroundColor"]
      const options = { color: color }
      return (leg["callsOnTripLeg"].map((stop: any) => {
        const cordinates: LatLngExpression = [stop["stopPoint"]["stopArea"]["latitude"], stop["stopPoint"]["stopArea"]["longitude"]]
        return (
          <Circle center={cordinates} radius={40} pathOptions={options}>
            <Popup>
              {stop["stopPoint"]["stopArea"]["name"]}
            </Popup>
          </Circle>
        )
      }
      ))
    })

    vectors = tripLegs.triplegs.map((leg: any) => {
      let vector : LatLngExpression[] = []
      const color = leg["serviceJourneys"][0]["line"]["backgroundColor"]
      const options = { color: color }
      leg["tripLegCoordinates"].map((stop: any) => {
        vector.push([stop["latitude"], stop["longitude"]])
      })
      return (<Polyline positions={vector} pathOptions={options}/>)
    })
  }

  return (
    <MapContainer center={[57.663563, 11.955211]} zoom={13} scrollWheelZoom={false} style={{ height: "400px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vectors}
      {legs}
    </MapContainer>
  )
}

