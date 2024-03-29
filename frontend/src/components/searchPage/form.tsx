import { TextInput, Button, Center, Box, Paper, Title, Collapse, Text, Stack, Checkbox, Group, Select, Radio  } from '@mantine/core';
import { IconBus, IconTrain, IconShip } from '@tabler/icons-react';

import { useForm } from '@mantine/form';
import { api, getStops } from '../api';
import { useDisclosure } from '@mantine/hooks';
import { DateTimePicker } from '@mantine/dates';
import { useState } from 'react';

export function RouteForm(setRoute: any) {

    const [suggestedStops, setSuggestedStops] = useState([])

    const form = useForm({
        initialValues: {
            orginName: { value: '', label: ''},
            destinationName: { value: '', label: ''},
            transportModes: ['bus', 'train', 'tram', 'ferry'],
            viaGid: { value: '', label: ''},
            onlyDirectConnections: false,
            time: "now", 
            dateTime: new Date(),
        },

    });

    console.log(form)
    console.log(suggestedStops)

    const test = [{value: "1", label: "first"}, {value: "2", label: "second"}, {value: "3", label: "3"}]


    const [opened, { toggle }] = useDisclosure(false);

    return (
        <Paper p="lg" shadow="xl" radius="lg" withBorder py={20} my={20}>
            <Title ta="center" >Sök Resa</Title>
            <form onSubmit={form.onSubmit((values) => api(values, setRoute.setRoute))}>
                <Stack>
                    <Select
                        withAsterisk
                        label="Från"
                        data={suggestedStops}
                        onSearchChange={(value) => {
                            if (value !== form.values.orginName.label) { 
                                console.log(value, form.values.orginName)
                            getStops(value, setSuggestedStops)
                            }}
                        }
                        searchable
                        onChange={(_, option) => {
                            form.setFieldValue('orginName', option)
                        }}

                    />
                    <Select
                        withAsterisk
                        label="Till"
                        data={suggestedStops}
                        onSearchChange={(value) => {
                            if (value !== form.values.destinationName.label) { 
                            getStops(value, setSuggestedStops)
                            }}
                        }
                        searchable
                        onChange={(_, option) => {
                            form.setFieldValue('destinationName', option)
                        }}
                    />
                     <Radio.Group
                        name="närresa"
                        label="När vill du resa?"
                        withAsterisk
                        {...form.getInputProps('time')}
                        >
                        <Group mt="xs">
                            <Radio value="now" label="Nu" />
                            <Radio value="departure" label="välj avgångstid" />
                            <Radio value="arrival" label="Völj Ankomst" />
                        </Group>
                        </Radio.Group>
                    <DateTimePicker label="Pick date and time" placeholder="Pick date and time" valueFormat="YYYY-MM-DD HH:mm" {...form.getInputProps("dateTime")} disabled={form.values.time === "now"} />

                    <Button variant='transparent' fullWidth onClick={toggle}>Expandera</Button>

                    <Collapse in={opened}>
                    <Select
                        label="Via"
                        data={suggestedStops}
                        onSearchChange={(value) => {
                            if (value !== form.values.viaGid.label) { 
                            getStops(value, setSuggestedStops)
                            }}
                        }
                        searchable
                        onChange={(_, option) => {
                            form.setFieldValue('viaGid', option)
                        }}
                    />
                        <Checkbox label="Utan byten?" {...form.getInputProps('onlyDirectConnections')} />
                        <Checkbox.Group
                            label="Välj transportmedel"
                            withAsterisk
                            {...form.getInputProps('transportModes')}
                        >
                            <Group>
                                <Checkbox label={<IconBus />} value="bus" />
                                <Checkbox label="Spårvagn" value="tram" />
                                <Checkbox label={<IconTrain />} value="train" />
                                <Checkbox label={<IconShip />} value="ferry" />
                            </Group>

                        </Checkbox.Group>
                    </Collapse>

                    <Center >
                        <Button fullWidth type="submit">Sök</Button>
                    </Center>
                </Stack>
            </form>
        </Paper>
    )
}