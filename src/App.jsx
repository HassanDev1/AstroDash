import {
  ChakraProvider,
  Flex,
  VStack,
  Icon,
  Heading,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import HeadContent from "./components/HeadContent";
import MainContent from "./components/MainContent";
import { InfoIcon, MoonIcon, SearchIcon } from "@chakra-ui/icons";

const App = () => {
  const API_KEY = import.meta.env.VITE_APP_API_KEY;

  const [data, setData] = useState([]);
  const [time, setTime] = useState("");
  const getWeather = async () => {
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Austin?unitGroup=us&include=moonrise&key=${API_KEY}&contentType=json`
    );

    setData(response.data.days);
    setTime(response.data.days[0].sunrise);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <ChakraProvider>
      <Flex
        width='100vw'
        h='100vh'
        alignItems='center'
        justifyContent='space-between'
        gap='2'
      >
        <VStack
          p='2em'
          width='20%'
          height='100%'
          bgColor='#44397B'
          color='whiteAlpha.700'
        >
          <Box flexDirection={"column"} margin='2em'>
            <Heading p={"1em"}>
              <Icon as={MoonIcon} bgSize />
              AstroDash
            </Heading>
            <Heading p={"0.5em"}>
              <Icon as={Icon} bgSize />
              DashBoard
            </Heading>
            <Heading p={"0.5em"}>
              {" "}
              <Icon as={SearchIcon} bgSize />
              Search
            </Heading>
            <Heading p={"0.5em"}>
              {" "}
              <Icon as={InfoIcon} bgSize />
              About
            </Heading>
          </Box>
        </VStack>
        <VStack
          p='2em'
          width='80%'
          height='100%'
          bgColor='#44397B'
          color='whiteAlpha.700'
        >
          <HeadContent time={time} />
          <MainContent data={data} />
        </VStack>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
