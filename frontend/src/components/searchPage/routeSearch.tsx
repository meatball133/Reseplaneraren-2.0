import { useEffect, useState } from 'react';
import { Container, Stack, Button } from '@mantine/core';
import { Route } from './route';
import { RouteForm } from './form';
import { IconArrowBigDownLines, IconArrowBigUpLines } from '@tabler/icons-react';
import { loadMoreRoutes } from '../api';

export function RouteSearch() {
    let [route, setRoute] = useState<any>([]);

    console.log(route)

    const routes = route["results"]?.map((route: any) => { 
        return <Route route={route} />
    })

    return (
        <Container size="30rem">
            
            <RouteForm setRoute={setRoute}/>
            { route["results"] ?
            <Button onClick={() => loadMoreRoutes({ref: route["links"]["previous"]}, "previous", setRoute)} my={25} h={50} fullWidth justify="space-between"   variant="light" rightSection={<IconArrowBigUpLines size={25} />} leftSection={<IconArrowBigUpLines size={25} />} gradient={{ from: 'violet', to: 'cyan', deg: 90 }}>Tidigare turer</Button>
            : <></>}
            <Stack>
            {routes}
            </Stack>
            { route["results"] ?
            <Button onClick={() => loadMoreRoutes({ref: route["links"]["next"]}, "next", setRoute)} my={25} h={50} fullWidth justify="space-between"   variant="light" rightSection={<IconArrowBigDownLines size={25} />} leftSection={<IconArrowBigDownLines size={25} />} gradient={{ from: 'violet', to: 'cyan', deg: 90 }}>Senare turer</Button>
            : <></>}
        </Container>
        
    );  
}
