import {
  Container,
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  ListIcon,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import { ReactComponent as AnalyticsIcon } from "../../shared/assets/analytics.svg";
import { ReactComponent as HomeIcon } from "../../shared/assets/home.svg";
import { ReactComponent as UsersIcon } from "../../shared/assets/users.svg";
import { ReactComponent as SettingsIcon } from "../../shared/assets/settings.svg";

const menuItems = [
  {
    title: "Homepage",
    path: "/",
    icon: HomeIcon,
  },
  {
    title: "Analytics",
    path: "/dashboard",
    icon: AnalyticsIcon,
  },
  {
    title: "Users",
    path: "/dashboard/users",
    icon: UsersIcon,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: SettingsIcon,
    disabled: true,
  },
];

export function DashboardLayout() {
  return (
    <Grid gridTemplateColumns="300px 1fr">
      <GridItem position="relative">
        <Box
          color="white"
          bgColor="teal.600"
          position="fixed"
          height="100vh"
          top="0"
          width="300px"
          left="0"
          borderRight="1px"
          borderColor="gray.200"
        >
          <Flex p="6" px="8" borderBottom="1px" borderColor="teal.500">
            <Heading fontSize="lg">Admin Panel</Heading>
          </Flex>
          <List my="5" px="4" spacing={1}>
            {menuItems.map((item) => (
              <NavLink to={item.path} key={item.path} end>
                {({ isActive }) => (
                  <ListItem
                    borderRadius="lg"
                    bgColor={isActive ? "blackAlpha.200" : undefined}
                    _hover={{
                      bgColor: isActive ? "blackAlpha.300" : "blackAlpha.200",
                    }}
                  >
                    <Flex p="3" w="full">
                      <ListIcon fontSize="2xl" color="white" as={item.icon} />
                      {item.title}
                    </Flex>
                  </ListItem>
                )}
              </NavLink>
            ))}
          </List>
        </Box>
      </GridItem>
      <GridItem>
        <Container maxW="container.xl" px="8">
          <Outlet />
        </Container>
      </GridItem>
    </Grid>
  );
}
