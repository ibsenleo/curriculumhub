import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAndReset } from "../../store/common";
// import { LogoIcon } from "../../utils/icons/LogoIcon";
import { ThemeChanger } from "./ThemeChanger";
import { LogoIcon } from "../../utils/icons/LogoIcon";

export const TopBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {username, firstName, lastName, avatar, email} = useSelector(store=>store.auth)

    const onUserMenuAction = (action) => {
        switch(action) {
            case 'logout': 
                // logout()
                dispatch(logoutAndReset())
                // navigate('/auth/login')
                break;
            case 'settings': 
                navigate('/settings')
                break;
            
            default: 
                console.log(action)
        }
    }
    //TODO: Get project name from .env
    let projectName = "Curriculum Hub"
    return (
        <Navbar 
        maxWidth="full"
        position="sticky"
        isBordered>
            <NavbarBrand>
                <LogoIcon />
                <p className="font-bold text-inherit">{projectName}</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {/* <NavbarItem>
                    <Link color="foreground" href="#">
                        Dashboard
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page" color="primary">
                        Balances
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Groups
                    </Link>
                </NavbarItem> */}
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <ThemeChanger/>
                <p className="text-sm font-bold capitalize" >{firstName || username}</p>
                <Dropdown placement="bottom-end">
                    
                        <DropdownTrigger>
                        <Avatar
                        
                            showFallback
                            isBordered
                            radius="full"
                            as="button"
                            className="transition-transform"
                            color=""
                            name={username}
                            size="sm"
                            src={avatar || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                        />
                        </DropdownTrigger>
                    
                    
                    <DropdownMenu 
                    aria-label="Profile Actions" 
                    variant="flat" 
                    onAction={onUserMenuAction}>
                        <DropdownItem key="profile" className="h-14 gap-2" textValue="Username">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">{email}</p>
                        </DropdownItem>
                        <DropdownItem key="settings">My Settings</DropdownItem>
                        {/* <DropdownItem key="team_settings">Team Settings</DropdownItem>
                        <DropdownItem key="analytics">Analytics</DropdownItem>
                        <DropdownItem key="system">System</DropdownItem>
                        <DropdownItem key="configurations">Configurations</DropdownItem>
                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
                        <DropdownItem key="logout" className="text-danger" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    )
}
