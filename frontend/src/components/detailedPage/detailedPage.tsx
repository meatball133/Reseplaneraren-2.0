import { Map } from './map';
import { detailedPageApi } from '../api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { List } from './list';
import { Container, Stack } from '@mantine/core';

export function DetailedPage() {
    let params = useParams();
    let [route, setRoute] = useState<any>([]);

    useEffect(() => {
        detailedPageApi(params.id ? params.id : "", setRoute)
    }, []) 

    console.log(route)


  return (
    <Container>
    <Map triplegs={route["tripLegs"]} />
    <Stack gap="lg">
    {
      route["tripLegs"] ? route["tripLegs"].map((tripLeg: any) => {
        return (
          <List tripLeg={tripLeg} />
        )
      }) : <></>
    }
    </Stack>
    </Container>
  );
}
//     <List tripLeg={route["tripLegs"][0]} />