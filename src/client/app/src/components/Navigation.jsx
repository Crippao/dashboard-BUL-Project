/* eslint-disable no-unused-vars */
import { Grid } from 'antd';
import { HomeOutlined, RadarChartOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import BottomNavigation from './BottomNavigation';

const { useBreakpoint } = Grid;
const { Sider } = Layout;

const Navigation = () => {
    const bk = useBreakpoint();

    const navigate = useNavigate();
    const [showAppBar, setShowAppBar] = useState(false);
    const [breakpoint, setBreakpoint] = useState(false);

    const menu = useMemo(() => {
        return [
            {
                key: "home",
                label: "Home",
                icon: <HomeOutlined className='font-semibold' />,
                onClick: () => navigate("/")
            },
            {
                key: "national-view",
                label: "Nazionale",
                icon: <RadarChartOutlined className='font-semibold' />,
                onClick: () => navigate("/national")
            },
            {
                key: "regional-view",
                label: "Regionale",
                icon: <RadarChartOutlined className='font-semibold' />,
                onClick: () => navigate("/regional")
            },
            {
                key: "italy-map",
                label: "Italy",
                icon: <EnvironmentOutlined className='font-semibold' />,
                onClick: () => navigate("/italy")
            },
        ]
    });

    useEffect(() => {
        const arr = Object.entries(bk).filter((screen) => !!screen[1])
        const isBig = arr.some((e) => e[0] == "md")

        setShowAppBar(!isBig);
    }, [bk])

    return (
        <>
            {!showAppBar && (
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    width={breakpoint ? "85%" : "10%"}
                    onBreakpoint={(broken) => {
                        setBreakpoint(broken)
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="mt-8" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']} items={menu} />
                </Sider>
            )}

            {showAppBar && (<BottomNavigation menuItems={menu} />)}
        </>

    )
}

export default Navigation;