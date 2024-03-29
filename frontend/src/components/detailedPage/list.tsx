import { ThemeIcon, Text, Avatar, Timeline, Paper, Badge, Collapse, Button  } from '@mantine/core';
import { IconCircleDot } from '@tabler/icons-react';
import { Timey } from '../time'
import { useDisclosure } from '@mantine/hooks';

export function List(tripLeg : any) {
    console.log(tripLeg)
    const [opened, { toggle }] = useDisclosure(false);
    const {name, foregroundColor, borderColor, backgroundColor} = tripLeg.tripLeg["serviceJourneys"][0]["line"]
    let triplegs = tripLeg.tripLeg["callsOnTripLeg"].map((stop: any) => {
        const dateOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' }
        let actuallFormattedTime;
        if (stop.estimatedArrivalTime === undefined) {
            actuallFormattedTime = new Date(stop.plannedArrivalTime).toLocaleTimeString('en-GB', dateOptions)
        } else {
            actuallFormattedTime = new Date(stop.estimatedArrivalTime).toLocaleTimeString('en-GB', dateOptions)
        }
        const formattedTime = new Date(stop.plannedArrivalTime).toLocaleTimeString('en-GB', dateOptions)

    return (
        <Timeline.Item
            key={stop.stopPoint.stopArea.id}
            title={stop.stopPoint.stopArea.name}
            bullet={<IconCircleDot />}
        >
            <Text size="lg">
                <Timey time={formattedTime} actuallTime={actuallFormattedTime}/>
            </Text>
        </Timeline.Item>
    )
})

    return (
        <Paper shadow="xl" radius="lg" withBorder p="xl" >
            <Badge color={backgroundColor} radius="sm" c={foregroundColor} my="sm">
                {name}
            </Badge>
            <Button onClick={toggle} variant="transparent">
                Expand

            </Button>
        <Timeline bulletSize={30}>
            {triplegs[0]}
            <Collapse in={opened}>
                {triplegs.slice(1, triplegs.length -1)}
            </Collapse>
            {triplegs[triplegs.length -1]}
            
        </Timeline>
        </Paper>

        
    )
    }