import Head from 'next/head'
import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect, useState } from 'react';
import {
    Button,
    List,
    Drawer,
    Input,
    Dropdown,
    MenuProps,
    Col,
    Row,
    Radio
} from 'antd';
import { connect } from 'react-redux'
import { resolveActions } from 'next-redux-observable'
import { loadUsers } from '../redux/actions/userAction'

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        ),
    },
    {
        key: '4',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '5',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: '6',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        ),
    },
    {
        key: '7',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '8',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: '9',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        ),
    },
    {
        key: '10',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '11',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: '12',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        ),
    },
];

const { Search } = Input;
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

const Home = ({ list }) => 
{
    const mapContainer = useRef(null);
    const map = useRef<any>(null);
    const [lng, setLng] = useState<number>(101.6841);
    const [lat, setLat] = useState<number>(3.1319);
    const [zoom, setZoom] = useState<number>(11.00);
    const [childrenDrawer, setChildrenDrawer] = useState<boolean>(false);

    const onSearch = (value: string) => console.log(value);

    const showChildrenDrawer = () => {
        setChildrenDrawer(true);
    };

    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    };



    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: `mapbox://styles/mapbox/streets-v12`,
            center: [lng, lat],
            zoom: zoom
        });

        // Default user position option
        map.current.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: false
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: false,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: false
        }));


        // Create default markers
        const marker = new mapboxgl.Marker()
            .setLngLat([101.6841, 3.1319])
            .addTo(map.current)

        // Add zoom and rotation controls to the map.
        map.current.addControl(new mapboxgl.NavigationControl());
        
        // Add a fullscreen control to a map
        // map.current.addControl(new mapboxgl.FullscreenControl());

        // Clean up on unmount
        // return () => map.current?.remove();
    }, []);


    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current?.getCenter().lng.toFixed(4));
            setLat(map.current?.getCenter().lat.toFixed(4));
            setZoom(map.current?.getZoom().toFixed(2));
        });

    });

    return (
        <>
            <Head>
                <title>NextJS Maps</title>
                <meta name="description" content="Find location on the map" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div ref={mapContainer}
                    style={{
                        position: 'absolute',
                        overflow: 'hidden',
                        height: '100%',
                        width: '100%'
                    }}
                />
                <div
                    style={{
                        paddingRight: '80px',
                        fontFamily: 'monospace',
                        zIndex: 1,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        margin: '12px',
                        borderRadius: '4px',
                        width: '100%',
                        maxWidth: '500px'
                    }}
                >
                    {/* Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} */}

                    <Row>
                        <Col flex={4}>
                            <Dropdown
                                menu={{ items }}
                                placement="bottomLeft"
                            >
                                <Search placeholder="input search text" onSearch={onSearch} enterButton size='middle' />
                            </Dropdown>
                        </Col>
                        <Col flex={1}>
                            <Button type="primary" onClick={showChildrenDrawer}>
                                History
                            </Button>

                        </Col>
                    </Row>

                </div>


                <div
                    style={{
                        color: '#fff',
                        padding: '6px 12px',
                        fontFamily: 'monospace',
                        zIndex: 1,
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        margin: '12px',
                        borderRadius: '4px',
                    }}
                >
                    <Drawer
                        title="Past Searches"
                        width={400}
                        closable={false}
                        onClose={onChildrenDrawerClose}
                        open={childrenDrawer}
                        placement='right'
                    >
                        <List
                            dataSource={data}
                            renderItem={(item) =>
                                <List.Item>
                                    <List.Item.Meta
                                        title={"🚩  " + `${item}`}
                                        description='Description of the place'
                                    />
                                </List.Item>
                            }
                        />
                    </Drawer>
                </div>

                <div
                    style={{
                        color: '#fff',
                        fontFamily: 'monospace',
                        zIndex: 1,
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        margin: '30px 6px',
                    }}
                >
                    <Radio.Group defaultValue="streets-v12" buttonStyle="solid" onChange={(e)=>map.current.setStyle('mapbox://styles/mapbox/' + e.target.value)} >
                        <Radio.Button value="streets-v12">Streets</Radio.Button>
                        <Radio.Button value="outdoors-v12">Outdoors</Radio.Button>
                        <Radio.Button value="satellite-v9">Satellite</Radio.Button>
                    </Radio.Group>    
                </div>

            </main>
        </>
    )




}


Home.getInitialProps = resolveActions([
    // loadUsers()
])

const mapStateToProps = state => ({
    // list: state.users.list
})


export default connect(mapStateToProps)(Home);