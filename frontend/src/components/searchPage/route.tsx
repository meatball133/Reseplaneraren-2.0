import { Paper, Progress, ThemeIcon, Badge, Tooltip, Title, Grid, AccordionChevron, Stack, Group } from '@mantine/core';
import { IconDisabled, IconBus, IconSpeedboat, IconTrain, IconDisabledOff  } from '@tabler/icons-react';
import { access } from 'fs';
import { TimeFormated } from './timeBox';

export function Route(props: any) {
  console.log(props)
  let route = props.route
  console.log(route)
  let legs: any = []
  const totalTime = route["tripLegs"]?.reduce((acc: number, curr: any) => {
    let connectionTime = curr["estimatedConnectingTimeInMinutes"] ? curr["estimatedConnectingTimeInMinutes"] : 0
    let travelTime = curr["estimatedDurationInMinutes"] ? curr["estimatedDurationInMinutes"] : curr["plannedDurationInMinutes"]
    return acc + travelTime + connectionTime
  }, 0)


  legs = route["tripLegs"]?.map((leg: any) => {
    let connection = () => {
      if (leg["estimatedConnectingTimeInMinutes"]) {
        return (
          <Progress.Section value={(leg["estimatedConnectingTimeInMinutes"] / totalTime) * 100} color="gray">
          </Progress.Section>
        )
      }
    }
    let { backgroundColor, borderColor, foregroundColor, shortName } = leg["serviceJourney"]["line"]
    let percentage = (leg["estimatedDurationInMinutes"] / totalTime) * 100
    let direction = leg["serviceJourney"]["direction"]
    return (
      <>
        {connection()}
        <Tooltip label={`${shortName} ${direction}`} position="bottom">
          <Progress.Section value={percentage} color={backgroundColor} style={{ overflow: "visible" }}>
            <Badge size="lg" radius="md" color={backgroundColor} variant="filled" style={{ border: `medium solid ${borderColor}`, bottom: "1.6rem", position: "relative", overflow: "visible" }} c={foregroundColor}>
              {shortName}
            </Badge>
          </Progress.Section>
        </Tooltip>
      </>
    )
  })

  const origin = route["tripLegs"][0]["origin"]["stopPoint"]["stopArea"]["name"]
  const platform = route["tripLegs"][0]["origin"]["stopPoint"]["platform"]
  const startTime = route["tripLegs"][0]["plannedDepartureTime"]
  const destinationTime = route["tripLegs"][route["tripLegs"].length - 1]["plannedArrivalTime"]
  const actuallDestinationTime = route["tripLegs"][route["tripLegs"].length - 1]["estimatedArrivalTime"]
  const actuallStartTime = route["tripLegs"][0]["estimatedDepartureTime"]
  const wheelCharAccesable = route["tripLegs"].some ((leg: any) => { return leg["serviceJourney"]["line"]["isWheelchairAccessible"]})
  const transportModes = route["tripLegs"].reduce((acc : string[], leg: any) => {
    if (!acc.includes(leg["serviceJourney"]["line"]["transportMode"])) {
      acc.push(leg["serviceJourney"]["line"]["transportMode"])
    }
    return acc
  }, []).map ((mode: any) => {
    switch(mode) {
      case "bus":
        return <ThemeIcon variant="light" radius="md"><IconBus/></ThemeIcon>
      case "tram":
      case "train":
        return <ThemeIcon variant="light" radius="md"><IconTrain/></ThemeIcon>
      case "boat":
        return <ThemeIcon variant="light" radius="md"><IconSpeedboat/></ThemeIcon>
    }
  })

  return (
    <Paper p="lg" shadow="xl" radius="lg" withBorder h={250} component="a" href={`/${route["detailsReference"]}`} >
      <Grid gutter={20} justify="center" align="center">
        <Grid.Col span={7}>
          <Title td="none" c="gray.9">{origin} <span style={{ color: "gray", fontSize: "1.5rem" }}><br/> Läge {platform}</span></Title>
        </Grid.Col>
        <Grid.Col span={5}>
         <TimeFormated style={{padding: "0px"}} departTime={startTime} arrivalTime={destinationTime} estimatedDepartureTime={actuallStartTime} estimatedArrivalTime={actuallDestinationTime}  />
        </Grid.Col>
        <Grid.Col span={5} m={0} p={0}>
          <Stack gap={5} m={0} pb={30} pl={10}>
           {!wheelCharAccesable ? <ThemeIcon variant="light" radius="md"><IconDisabledOff/></ThemeIcon> : <ThemeIcon variant="light" radius="md"><IconDisabled/></ThemeIcon>}
           <Group gap="xs">
          {transportModes}
          </Group>
          </Stack>
        </Grid.Col>
        <Grid.Col span={2} ></Grid.Col>
        <Grid.Col span={5} >
        </Grid.Col>
        <Grid.Col span={12}>
          <Progress.Root size={20} style={{ overflow: "visible" }}>
            {legs}
          </Progress.Root>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
