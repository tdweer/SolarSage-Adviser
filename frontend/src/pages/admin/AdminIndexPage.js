import React, {useState} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Icon} from "@mui/material";

import AdminDashPage from "./admin-pages/AdminDashPage";
import AdminClientPage from "./admin-pages/AdminClientPage";
import ProjectPage from "./admin-pages/ProjectPage";
import StaffPage from "./admin-pages/StaffPage";
import SalesPage from "./admin-pages/SalesPage";
import Adviser from "./admin-pages/Adviser";
import './admin.css';
import {  UserButton } from "@clerk/clerk-react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1, transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }), ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}),);

export const ClientLogo = () => (
    <Icon>
        <img src={require('../../assets/icon/client1.png')} height={25} width={25} alt={'icon'}/>
    </Icon>
)

export const AdviserLogo = () => (
    <Icon>
        <img src={require('../../assets/icon/adviser1.png')} height={25} width={25} alt={'icon'}/>
    </Icon>
)

export const StaffLogo = () => (
    <Icon>
        <img src={require('../../assets/icon/staff1.png')} height={25} width={25} alt={'icon'}/>
    </Icon>
)

export const SalesLogo = () => (
    <Icon>
        <img src={require('../../assets/icon/sale1.png')} height={25} width={25} alt={'icon'}/>
    </Icon>
)


export const ProjectLogo = () => (
    <Icon>
        <img src={require('../../assets/icon/project1.png')} height={25} width={25} alt={'icon'}/>
    </Icon>
)


export const DashIcon = () => (
    <Icon>
        <img src={require('../../assets/icon/dashboard.png')} height={25} width={25} style={{padding:2}} alt={'icon'}/>
    </Icon>
)

export default function AdminIndexPage() {

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [menuData, setMenuData] = useState("AdminDashPage");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Solar Sage Adviser
                    </Typography>
                    <UserButton />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    <ListItem disablePadding sx={{display: "block"}} onClick={() => setMenuData("AdminDashPage")}>
                        <ListItemButton
                            sx={{
                                minHeight: 40,
                                justifyContent: open ? "initial" : "center",
                                px: 2,
                            }}>
                            <ListItemIcon
                                sx={{
                                    minHeight: 0,
                                    mr: open ? 2 : "auto",
                                    justifyContent: "center",
                                }}>
                                <DashIcon/>
                            </ListItemIcon>
                            <ListItemText sx={{ml: 1}} primary="Dashboard"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{display: "block"}} onClick={() => setMenuData("Adviser")}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2,
                            }}>
                            <ListItemIcon
                                sx={{
                                    minHeight: 0,
                                    mr: open ? 2 : "auto",
                                    justifyContent: "center",
                                }}>
                                <AdviserLogo/>
                            </ListItemIcon>
                            <ListItemText sx={{ml: 1}} primary="Adviser"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{display: "block"}} onClick={() => setMenuData("ProjectPage")}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2,
                            }}>
                            <ListItemIcon
                                sx={{
                                    minHeight: 0,
                                    mr: open ? 2 : "auto",
                                    justifyContent: "center",
                                }}>
                                <ProjectLogo/>
                            </ListItemIcon>
                            <ListItemText sx={{ml: 1}} primary="Project"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{display: "block"}} onClick={() => setMenuData("AdminClientPage")}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2,
                            }}>
                            <ListItemIcon
                                sx={{
                                    minHeight: 0,
                                    mr: open ? 2 : "auto",
                                    justifyContent: "center",
                                }}>
                                <ClientLogo/>
                            </ListItemIcon>
                            <ListItemText sx={{ml: 1}} primary="Client"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{display: "block"}} onClick={() => setMenuData("StaffPage")}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2,
                            }}>
                            <ListItemIcon
                                sx={{
                                    minHeight: 0,
                                    mr: open ? 2 : "auto",
                                    justifyContent: "center",
                                }}>
                                <StaffLogo/>
                            </ListItemIcon>
                            <ListItemText sx={{ml: 1}} primary="Staff"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{display: "block"}} onClick={() => setMenuData("SalesPage")}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2,
                            }}>
                            <ListItemIcon
                                sx={{
                                    minHeight: 0,
                                    mr: open ? 2 : "auto",
                                    justifyContent: "center",
                                }}>
                                <SalesLogo/>
                            </ListItemIcon>
                            <ListItemText sx={{ml: 1}} primary="Sales"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                {menuData === "AdminDashPage" && <AdminDashPage/>}
                {menuData === "Adviser" && <Adviser/>}
                {menuData === "AdminClientPage" && <AdminClientPage/>}
                {menuData === "ProjectPage" && <ProjectPage/>}
                {menuData === "StaffPage" && <StaffPage/>}
                {menuData === "SalesPage" && <SalesPage/>}
            </Box>
        </Box>
    );
}
