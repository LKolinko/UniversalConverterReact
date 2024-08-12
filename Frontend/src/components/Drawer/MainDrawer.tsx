import { Box, Drawer, DrawerProps, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { FC, useState, useEffect } from 'react';

import { Link, useLocation } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import HomeIconOutlined from '@mui/icons-material/HomeOutlined';

import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import PaletteTwoToneIcon from '@mui/icons-material/Palette';

const MainDrawer: FC<DrawerProps> = (props) => {
    const { onClose, ...others } = props;

    const location = useLocation();
    const [selectedIndex, setSelectedIndex] = useState(location.pathname.replace('/', ''));

    useEffect(() => {
        setSelectedIndex(location.pathname.replace('/', ''));
    }, [location.pathname])


    const handleListItemClick = (index: string) => {
        setSelectedIndex(index);
        onClose?.({}, 'backdropClick');
    };
    return (
        <Drawer {...others} onClose={onClose}>
            <Toolbar >
                <Typography color="inherit" sx={{ fontWeight: 500, letterSpacing: 0.5, fontSize: 20 }}>
                    Material You
                </Typography>
            </Toolbar>
            <List >
                <Box>
                    <ListItem >
                        <ListItemButton component={Link} to='/Home' selected={selectedIndex == 'Home'} onClick={() => handleListItemClick('Home')}>
                            <ListItemIcon>
                                {selectedIndex == 'Home' ? <HomeIcon /> : <HomeIconOutlined />}
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem >
                        <ListItemButton component={Link} to='/ColorSystem' selected={selectedIndex == 'ColorSystem'} onClick={() => handleListItemClick('ColorSystem')}>
                            <ListItemIcon>
                                {selectedIndex == 'ColorSystem' ? <PaletteTwoToneIcon /> : <PaletteOutlinedIcon />}
                            </ListItemIcon>
                            <ListItemText>Color System</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem >
                        <ListItemButton component={Link} to='/UniversalConverter' selected={selectedIndex == 'UniversalConverter'} onClick={() => handleListItemClick('UniversalConverter')}>
                            <ListItemText>Universal Converter</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    {/*<ListItem >
                        <ListItemButton component={Link} to='/About' selected={selectedIndex == 'About'} onClick={() => handleListItemClick('About')}>
                            <ListItemIcon>
                                {selectedIndex == 'About' ? <InfoIcon /> : <InfoIconOutlined />}
                            </ListItemIcon>
                            <ListItemText>About</ListItemText>
                        </ListItemButton>
                    </ListItem>*/}
                </Box>
            </List>
        </Drawer>
    );
};

export default MainDrawer;